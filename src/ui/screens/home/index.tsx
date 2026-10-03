import { View } from "react-native";

import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { useAccount } from "@/app/hooks/queries/use-account";

import { DietPlanModal } from "@/ui/screens/onboarding/components/diet-plan-modal";

export function Home() {
  const { signOut } = useAuth();
  const { data: account, refetch } = useAccount();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DietPlanModal />
    </View>
  );
}
