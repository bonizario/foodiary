import { ArrowRightIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";

import { Gender } from "@/app/constants/gender";

import { Button } from "@/ui/components/button";
import { RadioGroup } from "@/ui/components/radio-group";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import type { OnboardingSchemaInput } from "@/ui/screens/onboarding/schema";
import { theme } from "@/ui/styles/theme";

export function GenderStep() {
  const form = useFormContext<OnboardingSchemaInput>();

  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    const isValid = await form.trigger("gender");

    if (isValid) {
      nextStep();
    }
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Qual é seu gênero?</Step.Title>
        <Step.Subtitle>Seu gênero influencia no tipo da dieta.</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <Controller
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onChangeValue={(value) => {
                field.onChange(value);
                void form.trigger("gender");
              }}
              error={!!fieldState.error}
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
