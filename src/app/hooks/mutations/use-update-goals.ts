import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/app/lib/query-client";
import { GoalsService } from "@/app/services/goals-service";

export function useUpdateGoals() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GoalsService.UpdateGoalsPayload) => {
      await GoalsService.updateGoals(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });

  return {
    isUpdatingGoals: isPending,
    updateGoals: mutateAsync,
  };
}
