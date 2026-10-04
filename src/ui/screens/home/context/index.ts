import { createContext } from "react";

import type { SimplifiedMeal } from "@/app/constants/meal";

export type HomeContextValue = {
  currentDate: Date;
  meals: SimplifiedMeal[];
  isFetching: boolean;
  previousDay: () => void;
  nextDay: () => void;
};

export const HomeContext = createContext<HomeContextValue>({
  currentDate: new Date(),
  meals: [],
  isFetching: false,
  previousDay: () => {},
  nextDay: () => {},
});
