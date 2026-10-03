import { View } from "react-native";

import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { useAccount } from "@/app/hooks/queries/use-account";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { DietPlanModal } from "@/ui/screens/onboarding/components/diet-plan-modal";

export function Home() {
  const { signOut } = useAuth();
  const { data: account, refetch } = useAccount();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DietPlanModal />
      <AppText>Welcome to the Home Screen!</AppText>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}
