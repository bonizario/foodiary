import { ArrowRightIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import type { OnboardingSchemaInput } from "@/ui/screens/onboarding/schema";
import { theme } from "@/ui/styles/theme";
import { formatDecimal } from "@/ui/utils/format-decimal";

export function WeightStep() {
  const form = useFormContext<OnboardingSchemaInput>();

  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    const isValid = await form.trigger("weight");

    if (isValid) {
      nextStep();
    }
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Que é seu peso?</Step.Title>
        <Step.Subtitle>Você pode inserir uma estimativa</Step.Subtitle>
      </Step.Header>

      <Step.Content position="center">
        <Controller
          control={form.control}
          name="weight"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Peso (kg)"
              style={{ width: "100%" }}
              error={fieldState.error?.message}
            >
              <Input
                autoFocus
                inputMode="decimal"
                placeholder="80"
                formatter={formatDecimal}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormGroup>
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
