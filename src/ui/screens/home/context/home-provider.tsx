import type { ReactElement } from "react";

import { HomeContext, type HomeContextValue } from "@/ui/screens/home/context";

type HomeProviderProps = HomeContextValue & {
  children: ReactElement;
};

export function HomeProvider({ children, ...contextValue }: HomeProviderProps) {
  return <HomeContext value={contextValue}>{children}</HomeContext>;
}
