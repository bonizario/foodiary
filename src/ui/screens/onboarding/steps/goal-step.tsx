import { ArrowRightIcon } from "lucide-react-native";

import { Goal } from "@/app/constants/goal";

import { Button } from "@/ui/components/button";
import { RadioGroup } from "@/ui/components/radio-group";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";

export function GoalStep() {
  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual é seu objetivo?</Step.Title>
        <Step.Subtitle>O que você pretende alcançar com a dieta?</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <RadioGroup value={Goal.LOSE} onChangeValue={() => {}}>
          <RadioGroup.Item value={Goal.LOSE}>
            <RadioGroup.Icon>🥦</RadioGroup.Icon>
            <RadioGroup.Label>Perder peso</RadioGroup.Label>
          </RadioGroup.Item>
          <RadioGroup.Item value={Goal.MAINTAIN}>
            <RadioGroup.Icon>🍍</RadioGroup.Icon>
            <RadioGroup.Label>Manter o peso</RadioGroup.Label>
          </RadioGroup.Item>
          <RadioGroup.Item value={Goal.GAIN}>
            <RadioGroup.Icon>🥩</RadioGroup.Icon>
            <RadioGroup.Label>Ganhar peso</RadioGroup.Label>
          </RadioGroup.Item>
        </RadioGroup>
      </Step.Content>

      <Step.Footer>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </Step.Footer>
    </Step>
  );
}
