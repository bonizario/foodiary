import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { MealsService } from "@/app/services/meals-service";

import { toLocalDateString } from "@/shared/functions/to-local-date-string";

export function useMeals(date: Date) {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["meals", toLocalDateString(date)],
    queryFn: async () => {
      const { meals } = await MealsService.listByDate(date);
      return meals;
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    isFetchingMeals: isFetching,
    isLoadingMeals: isLoading,
    meals: data ?? [],
    refetchMeals: refetch,
  };
}
