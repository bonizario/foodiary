import { use } from "react";

import { AuthContext } from "@/app/contexts/auth-context";

export function useAuth() {
  return use(AuthContext);
}
