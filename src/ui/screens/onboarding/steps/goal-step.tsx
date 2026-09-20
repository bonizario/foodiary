import { ArrowRightIcon } from "lucide-react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";

export function GoalStep() {
  const { nextStep } = useOnboarding();

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual é seu objetivo?</Step.Title>
        <Step.Subtitle>O que você pretende alcançar com a dieta?</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <AppText>Hello Content..</AppText>
      </Step.Content>

      <Step.Footer>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </Step.Footer>
    </Step>
  );
}
