import type { Account } from "@/application/entities/account";
import { Injectable } from "@/core/decorators/injectable";
import { dynamoClient } from "@/infrastructure/clients/dynamo-client";
import { AppConfig } from "@/shared/config/app-config";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { AccountItem } from "../items/account-item";

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  public async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.config.db.dynamo.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
