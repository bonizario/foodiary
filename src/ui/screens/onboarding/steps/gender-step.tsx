import { ArrowRightIcon } from "lucide-react-native";

import { Gender } from "@/app/constants/gender";

import { Button } from "@/ui/components/button";
import { RadioGroup } from "@/ui/components/radio-group";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";

export function GenderStep() {
  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual é seu gênero?</Step.Title>
        <Step.Subtitle>Seu gênero influencia no tipo da dieta.</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <RadioGroup
          orientation="horizontal"
          value={Gender.MALE}
          onChangeValue={() => {}}
        >
          <RadioGroup.Item value={Gender.MALE}>
            <RadioGroup.Icon>🧔‍♂️</RadioGroup.Icon>
            <RadioGroup.Label>Masculino</RadioGroup.Label>
          </RadioGroup.Item>
          <RadioGroup.Item value={Gender.FEMALE}>
            <RadioGroup.Icon>👱‍♀️</RadioGroup.Icon>
            <RadioGroup.Label>Feminino</RadioGroup.Label>
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
