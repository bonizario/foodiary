import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/app/lib/query-client";
import { ProfileService } from "@/app/services/profile-service";

export function useUpdateProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: ProfileService.UpdateProfilePayload) => {
      await ProfileService.updateProfile(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });

  return {
    isUpdatingProfile: isPending,
    updateProfile: mutateAsync,
  };
}
