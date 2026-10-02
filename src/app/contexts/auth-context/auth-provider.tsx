import { useCallback, useLayoutEffect, useState, type ReactElement } from "react";

import { AuthContext } from "@/app/contexts/auth-context";
import { AuthTokensManager } from "@/app/lib/auth-tokens-manager";
import { AuthService } from "@/app/services/auth-service";

export function AuthProvider({ children }: { children: ReactElement }) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    const tokens = await AuthService.signIn(payload);
    await AuthTokensManager.save(tokens);
    setSignedIn(true);
  }, []);

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    const tokens = await AuthService.signUp(payload);
    await AuthTokensManager.save(tokens);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    setSignedIn(false);
    await AuthTokensManager.clear();
  }, []);

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();
      setSignedIn(!!tokens);
    }

    void load();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
