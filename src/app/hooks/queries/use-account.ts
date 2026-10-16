import { useQuery } from "@tanstack/react-query";

import { AccountsService } from "@/app/services/accounts-service";

type UseAccountOptions = {
  enabled?: boolean;
};

export function useAccount({ enabled }: UseAccountOptions = { enabled: true }) {
  const { data, refetch } = useQuery({
    queryKey: ["account"],
    queryFn: AccountsService.getMe,
    staleTime: Infinity,
    enabled,
  });

  return {
    account: data,
    refetchAccount: refetch,
  };
}
