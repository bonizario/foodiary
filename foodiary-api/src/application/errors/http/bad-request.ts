import { ErrorCode } from "../error-code";
import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  public override statusCode = 400;

  public override code: ErrorCode;

  constructor(message?: string, code?: ErrorCode) {
    super();

    this.code = code ?? ErrorCode.BAD_REQUEST;
    this.message = message ?? "Bad Request";
    this.name = "BadRequestError";
  }
}
