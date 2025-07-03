import type { Account } from "@/application/entities/account";
import { Injectable } from "@/core/decorators/injectable";
import { dynamoClient } from "@/infrastructure/clients/dynamo-client";
import { AppConfig } from "@/shared/config/app-config";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  public async create(account: Account): Promise<void> {
    const command = new PutCommand({
      TableName: this.config.db.dynamo.mainTable,
      Item: {
        id: account.id,
        email: account.email,
        externalId: account.externalId,
        type: "Account",
        PK: `ACCOUNT#${account.id}`,
      },
    });

    await dynamoClient.send(command);
  }
}
