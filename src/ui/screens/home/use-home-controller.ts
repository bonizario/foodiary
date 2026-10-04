import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useMeals } from "@/app/hooks/queries/use-meals";

export function useHomeController() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  const { data: meals = [], isLoading, isFetching, refetch: refetchMeals } = useMeals(currentDate);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetchMeals();
    setIsRefreshing(false);
  }, [refetchMeals]);

  const handleNextDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date();
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  }, []);

  const handlePreviousDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date();
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  }, []);

  return {
    top,
    bottom,
    currentDate,
    isFetching: isFetching && !isRefreshing,
    isLoading,
    isRefreshing,
    meals,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  };
}
