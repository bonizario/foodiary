import { useCallback, useState, type ReactElement } from "react";

import { AuthContext } from "@/app/contexts/auth-context";
import { AuthService } from "@/app/services/auth-service";

export function AuthProvider({ children }: { children: ReactElement }) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    await AuthService.signIn(payload);
    setSignedIn(true);
  }, []);

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    await AuthService.signUp(payload);
    setSignedIn(true);
  }, []);

  console.log({ signedIn });

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signUp }}>{children}</AuthContext.Provider>
  );
}
