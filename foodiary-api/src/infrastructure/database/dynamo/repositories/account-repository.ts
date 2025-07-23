import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

import type { Account } from "@/application/entities/account";
import { Injectable } from "@/core/decorators/injectable";
import { dynamoClient } from "@/infrastructure/clients/dynamo-client";
import { AccountItem } from "@/infrastructure/database/dynamo/items/account-item";
import { AppConfig } from "@/shared/config/app-config";

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

  public async findByEmail(email: string): Promise<Account | null> {
    const command = new QueryCommand({
      IndexName: "GSI1",
      TableName: this.config.db.dynamo.mainTable,
      Limit: 1,
      KeyConditionExpression: "#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK",
      ExpressionAttributeNames: {
        "#GSI1PK": "GSI1PK",
        "#GSI1SK": "GSI1SK",
      },
      ExpressionAttributeValues: {
        ":GSI1PK": AccountItem.getGSI1PK(email),
        ":GSI1SK": AccountItem.getGSI1SK(email),
      },
    });

    const { Items } = await dynamoClient.send(command);

    const account = Items?.[0] as AccountItem.Document | undefined;

    if (!account) {
      return null;
    }

    return AccountItem.toEntity(account);
  }
}
