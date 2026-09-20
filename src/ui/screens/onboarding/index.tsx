import { View } from "react-native";

import type { AuthStackScreenProps } from "@/app/navigation/auth-stack";

import { AppText } from "@/ui/components/app-text";
import { OnboardingProvider } from "@/ui/screens/onboarding/context/onboarding-provider";
import { OnboardingStack } from "@/ui/screens/onboarding/onboarding-stack";

export function Onboarding(props: AuthStackScreenProps<"Onboarding">) {
  return (
    <OnboardingProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText fontSize="3xl" weight="semibold">
          Onboarding
        </AppText>
      </View>
      <OnboardingStack />
    </OnboardingProvider>
  );
}
