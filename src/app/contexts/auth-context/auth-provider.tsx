import { useQueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useLayoutEffect, useMemo, useState, type ReactElement } from "react";

import { AuthContext } from "@/app/contexts/auth-context";
import { useAccount } from "@/app/hooks/queries/use-account";
import { useForceRender } from "@/app/hooks/use-force-render";
import { AuthTokensManager } from "@/app/lib/auth-tokens-manager";
import { AuthService } from "@/app/services/auth-service";
import { Service } from "@/app/services/service";

void SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: { children: ReactElement }) {
  const [isReady, setIsReady] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const queryClient = useQueryClient();

  const { account, refetchAccount } = useAccount({ enabled: false });

  const forceRender = useForceRender();

  const signOut = useCallback(async () => {
    Service.removeAccessToken();
    Service.removeRefreshTokenHandler();
    queryClient.clear();
    forceRender();
    await AuthTokensManager.clear();
  }, [queryClient, forceRender]);

  const setupAuth = useCallback(
    async (tokens: AuthTokensManager.Tokens): Promise<void> => {
      Service.setAccessToken(tokens.accessToken);

      Service.setRefreshTokenHandler(async () => {
        try {
          const storedTokens = await AuthTokensManager.load();
          if (!storedTokens) {
            throw new Error("Tokens not found");
          }
          const newTokens = await AuthService.refreshToken({
            refreshToken: storedTokens.refreshToken,
          });
          Service.setAccessToken(newTokens.accessToken);
          await AuthTokensManager.save(newTokens);
        } catch (error) {
          await signOut();
          throw error;
        }
      });

      await refetchAccount();
      void SplashScreen.hideAsync();
      setIsReady(true);
    },
    [refetchAccount, signOut],
  );

  const signIn = useCallback(
    async (payload: AuthService.SignInPayload) => {
      const tokens = await AuthService.signIn(payload);
      await AuthTokensManager.save(tokens);
      await setupAuth(tokens);
    },
    [setupAuth],
  );

  const signUp = useCallback(
    async (payload: AuthService.SignUpPayload) => {
      const tokens = await AuthService.signUp(payload);
      await AuthTokensManager.save(tokens);
      await setupAuth(tokens);
      setSignedUp(true);
    },
    [setupAuth],
  );

  const contextValue = useMemo(
    () => ({
      signedIn: !!account,
      signedUp,
      signIn,
      signUp,
      signOut,
    }),
    [account, signIn, signOut, signUp, signedUp],
  );

  useLayoutEffect(() => {
    async function load() {
      try {
        const tokens = await AuthTokensManager.load();

        if (!tokens) {
          return;
        }

        await setupAuth(tokens);
      } catch {
        // boot auth failed (e.g. network) - fall through to unauthenticated UI
      } finally {
        setIsReady(true);
        void SplashScreen.hideAsync();
      }
    }

    void load();
  }, [setupAuth]);

  if (!isReady) {
    return null;
  }

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
