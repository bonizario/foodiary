import { useQuery } from "@tanstack/react-query";

import { AccountService } from "@/app/services/account-service";

type UseAccountOptions = {
  enabled?: boolean;
};

export function useAccount({ enabled }: UseAccountOptions = { enabled: true }) {
  const { data, refetch } = useQuery({
    queryKey: ["account"],
    queryFn: AccountService.getMe,
    staleTime: Infinity,
    enabled,
  });

  return {
    account: data,
    refetchAccount: refetch,
  };
}
