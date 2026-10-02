import { useQueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useLayoutEffect, useState, type ReactElement } from "react";

import { AuthContext } from "@/app/contexts/auth-context";
import { useAccount } from "@/app/hooks/queries/use-account";
import { useForceRender } from "@/app/hooks/use-force-render";
import { AuthTokensManager } from "@/app/lib/auth-tokens-manager";
import { AuthService } from "@/app/services/auth-service";
import { Service } from "@/app/services/service";

void SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: { children: ReactElement }) {
  const [isReady, setIsReady] = useState(false);

  const queryClient = useQueryClient();

  const { data: account, refetch: loadAccount } = useAccount({ enabled: false });

  const forceRender = useForceRender();

  const setupAuth = useCallback(
    async (tokens: AuthTokensManager.Tokens) => {
      Service.setAuthorizationHeader(tokens.accessToken);
      await loadAccount();
      void SplashScreen.hideAsync();
      setIsReady(true);
    },
    [loadAccount],
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
    },
    [setupAuth],
  );

  const signOut = useCallback(async () => {
    Service.removeAuthorizationHeader();
    queryClient.clear();
    forceRender();
    await AuthTokensManager.clear();
  }, [queryClient, forceRender]);

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        void SplashScreen.hideAsync();
        return;
      }

      await setupAuth(tokens);
    }

    void load();
  }, [loadAccount, setupAuth]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signedIn: !!account, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
