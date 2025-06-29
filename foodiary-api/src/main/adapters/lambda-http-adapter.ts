import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { ZodError } from "zod";

import type { Controller } from "@/application/contracts/controller";
import { ErrorCode } from "@/application/errors/error-code";
import { HttpError } from "@/application/errors/http/http-error";
import { lambdaBodyParser } from "@/main/utils/lambda-body-parser";
import { lambdaErrorResponse } from "@/main/utils/lambda-error-response";

export function lambdaHttpAdapter(controller: Controller<unknown>) {
  // Log the ZodError constructor identity at the catch site
  console.log("[lambda-http-adapter] ZodError constructor:", ZodError);
  return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
      const body = lambdaBodyParser(event.body);
      const params = event.pathParameters ?? {};
      const queryParams = event.queryStringParameters ?? {};

      const response = await controller.execute({
        body,
        params,
        queryParams,
      });

      return {
        statusCode: response.statusCode,
        body: response.body ? JSON.stringify(response.body) : undefined,
      };
    } catch (err) {
      const error = err as Error;
      // Log the error's constructor at the catch site
      console.log("[lambda-http-adapter] error.constructor:", error.constructor);
      console.log(
        "ERROR NAME:",
        error.name,
        "\n\n\nERROR MESSAGE:",
        error.message,
        "\n\n\nERROR STACK:",
        error.stack,
        "\n\n\nINSTANCEOF",
        error instanceof ZodError,
      );
      if (error instanceof ZodError) {
        return lambdaErrorResponse({
          code: ErrorCode.VALIDATION,
          message: error.issues.map((issue) => ({
            field: issue.path.join("."),
            error: issue.message,
          })),
          statusCode: 400,
        });
      }

      if (error instanceof HttpError) {
        return lambdaErrorResponse(error);
      }

      console.error(error);

      return lambdaErrorResponse({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        statusCode: 500,
      });
    }
  };
}
