import { ArrowRightIcon } from "lucide-react-native";

import { ActivityLevel } from "@/app/constants/activity-level";

import { Button } from "@/ui/components/button";
import { RadioGroup } from "@/ui/components/radio-group";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";

export function ActivityLevelStep() {
  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual seu nível de atividade?</Step.Title>
        <Step.Subtitle>Isso nos ajuda a personalizar sua dieta.</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <RadioGroup value={ActivityLevel.SEDENTARY} onChangeValue={() => {}}>
          <RadioGroup.Item value={ActivityLevel.SEDENTARY}>
            <RadioGroup.Icon>🛋️</RadioGroup.Icon>
            <RadioGroup.ItemInfo>
              <RadioGroup.Label>Sedentário</RadioGroup.Label>
              <RadioGroup.Description>
                Pouco ou nenhum exercício
              </RadioGroup.Description>
            </RadioGroup.ItemInfo>
          </RadioGroup.Item>

          <RadioGroup.Item value={ActivityLevel.LIGHT}>
            <RadioGroup.Icon>🥬</RadioGroup.Icon>
            <RadioGroup.ItemInfo>
              <RadioGroup.Label>Leve</RadioGroup.Label>
              <RadioGroup.Description>
                Exercício leve 1-2x por semana
              </RadioGroup.Description>
            </RadioGroup.ItemInfo>
          </RadioGroup.Item>

          <RadioGroup.Item value={ActivityLevel.MODERATE}>
            <RadioGroup.Icon>⚡</RadioGroup.Icon>
            <RadioGroup.ItemInfo>
              <RadioGroup.Label>Moderado</RadioGroup.Label>
              <RadioGroup.Description>
                Exercício moderado 3-5x por semana
              </RadioGroup.Description>
            </RadioGroup.ItemInfo>
          </RadioGroup.Item>

          <RadioGroup.Item value={ActivityLevel.HEAVY}>
            <RadioGroup.Icon>🔥</RadioGroup.Icon>
            <RadioGroup.ItemInfo>
              <RadioGroup.Label>Intenso</RadioGroup.Label>
              <RadioGroup.Description>
                Exercício intenso 6-7x por semana
              </RadioGroup.Description>
            </RadioGroup.ItemInfo>
          </RadioGroup.Item>

          <RadioGroup.Item value={ActivityLevel.ATHLETE}>
            <RadioGroup.Icon>🏋️</RadioGroup.Icon>
            <RadioGroup.ItemInfo>
              <RadioGroup.Label>Atleta</RadioGroup.Label>
              <RadioGroup.Description>
                Treino profissional diário
              </RadioGroup.Description>
            </RadioGroup.ItemInfo>
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
