import { useCallback, useState } from "react";

import { useMeals } from "@/app/hooks/queries/use-meals";

import { useSafeArea } from "@/ui/hooks/use-safe-area";

export function useHomeController() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top, bottom } = useSafeArea();

  const { isFetchingMeals, isLoadingMeals, meals, refetchMeals } = useMeals(currentDate);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetchMeals();
    setIsRefreshing(false);
  }, [refetchMeals]);

  const handleNextDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  }, []);

  const handlePreviousDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  }, []);

  return {
    top,
    bottom,
    currentDate,
    isFetching: isFetchingMeals && !isRefreshing,
    isLoading: isLoadingMeals,
    isRefreshing,
    meals,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  };
}
