import { useQuery } from "@tanstack/react-query";

import { MealStatus } from "@/app/types/meal";
import { MealsService } from "@/app/services/meals-service";

const PROCESSING_STATUSES: MealStatus[] = [
  MealStatus.UPLOADING,
  MealStatus.QUEUED,
  MealStatus.PROCESSING,
];

const REFETCH_INTERVAL = 2_000;

export function useMeal(mealId?: string) {
  const { data, isFetching } = useQuery({
    enabled: !!mealId,
    queryKey: ["meal", mealId],
    queryFn: async () => {
      if (!mealId) {
        return null;
      }
      const { meal } = await MealsService.getById(mealId);
      return meal;
    },
    refetchInterval: (query) => {
      const mealStatus = query.state.data?.status;

      if (mealStatus && PROCESSING_STATUSES.includes(mealStatus)) {
        return REFETCH_INTERVAL;
      }

      return false;
    },
    staleTime: Infinity,
  });

  const isProcessingMeal = !!(data && PROCESSING_STATUSES.includes(data.status));

  return {
    isFetchingMeal: isFetching,
    isProcessingMeal,
    meal: data,
  };
}
