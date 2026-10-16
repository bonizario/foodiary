import { useMutation } from "@tanstack/react-query";

import { getFileInfo } from "@/app/lib/get-file-info";
import { MealsService } from "@/app/services/meals-service";

import { getDeviceTimeZone } from "@/shared/functions/get-device-time-zone";

export function useCreateMeal() {
  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { name, size, type } = await getFileInfo(fileUri);

      return await MealsService.create({
        file: {
          name,
          size,
          type,
          uri: fileUri,
        },
        timeZone: getDeviceTimeZone(),
      });
    },
  });

  return {
    createdMealId: data?.mealId ?? undefined,
    createMeal: mutateAsync,
    isCreatingMeal: isPending,
  };
}
