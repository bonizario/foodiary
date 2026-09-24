import { ArrowRightIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";

import { BiologicalSex } from "@/app/constants/biological-sex";

import { Button } from "@/ui/components/button";
import { RadioGroup } from "@/ui/components/radio-group";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import type { OnboardingSchemaInput } from "@/ui/screens/onboarding/schema";
import { theme } from "@/ui/styles/theme";

export function BiologicalSexStep() {
  const form = useFormContext<OnboardingSchemaInput>();

  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    const isValid = await form.trigger("biologicalSex");

    if (isValid) {
      nextStep();
    }
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual é o seu sexo biológico?</Step.Title>
        <Step.Subtitle>
          Usamos essa informação para calcular suas necessidades calóricas com
          mais precisão.
        </Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <Controller
          control={form.control}
          name="biologicalSex"
          render={({ field, fieldState }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onChangeValue={(value) => {
                field.onChange(value);
                void form.trigger("biologicalSex");
              }}
              error={!!fieldState.error}
            >
              <RadioGroup.Item value={BiologicalSex.MALE}>
                <RadioGroup.Icon>🧔‍♂️</RadioGroup.Icon>
                <RadioGroup.Label>Masculino</RadioGroup.Label>
              </RadioGroup.Item>
              <RadioGroup.Item value={BiologicalSex.FEMALE}>
                <RadioGroup.Icon>👱‍♀️</RadioGroup.Icon>
                <RadioGroup.Label>Feminino</RadioGroup.Label>
              </RadioGroup.Item>
            </RadioGroup>
          )}
        />
      </Step.Content>

      <Step.Footer>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </Step.Footer>
    </Step>
  );
}
