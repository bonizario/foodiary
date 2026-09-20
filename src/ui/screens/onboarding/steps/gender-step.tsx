import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import type { OnboardingStackScreenProps } from "@/ui/screens/onboarding/onboarding-stack";

export function GenderStep(props: OnboardingStackScreenProps<"Gender">) {
  const { currentStepIndex, nextStep, previousStep } = useOnboarding();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText fontSize="3xl" weight="semibold">
        GenderStep
      </AppText>

      <View>
        <Button onPress={previousStep}>Voltar</Button>
        <AppText>{currentStepIndex}</AppText>
        <Button onPress={nextStep}>Avançar</Button>
      </View>
    </View>
  );
}
