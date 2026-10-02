import { useQuery } from "@tanstack/react-query";

import { AccountsService } from "@/app/services/accounts-service";

type UseAccountOptions = {
  enabled?: boolean;
};

export function useAccount(options?: UseAccountOptions) {
  return useQuery({
    queryKey: ["account"],
    queryFn: AccountsService.getMe,
    staleTime: Infinity,
    enabled: options?.enabled ?? true,
  });
}
