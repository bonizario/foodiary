import { use } from "react";

import { HomeContext } from "@/ui/screens/home/context";

export function useHomeContext() {
  return use(HomeContext);
}
