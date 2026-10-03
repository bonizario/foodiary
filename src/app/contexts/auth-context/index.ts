import { createContext } from "react";

import type { AuthService } from "@/app/services/auth-service";

export type AuthContextValue = {
  signedIn: boolean;
  signedUp: boolean;
  signIn: (payload: AuthService.SignInPayload) => Promise<void>;
  signUp: (payload: AuthService.SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  signedIn: false,
  signedUp: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});
