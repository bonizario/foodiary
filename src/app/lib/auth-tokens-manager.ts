import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthTokensManager {
  private static readonly KEY = "@foodiary:auth-tokens";

  public static async save(tokens: AuthTokensManager.Tokens): Promise<void> {
    await AsyncStorage.setItem(this.KEY, JSON.stringify(tokens));
  }

  public static async load(): Promise<AuthTokensManager.Tokens | null> {
    try {
      const tokens = await AsyncStorage.getItem(this.KEY);

      if (!tokens) {
        return null;
      }

      return JSON.parse(tokens);
    } catch {
      return null;
    }
  }

  public static async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.KEY);
  }
}

export namespace AuthTokensManager {
  export type Tokens = {
    accessToken: string;
    refreshToken: string;
  };
}
