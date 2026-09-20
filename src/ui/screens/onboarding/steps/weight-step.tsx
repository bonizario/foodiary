import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { OnboardingStackScreenProps } from "@/ui/screens/onboarding/onboarding-stack";

export function WeightStep(props: OnboardingStackScreenProps<"Weight">) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText fontSize="3xl" weight="semibold">
        WeightStep
      </AppText>
    </View>
  );
}
