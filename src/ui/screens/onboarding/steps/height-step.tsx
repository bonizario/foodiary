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

export function HeightStep() {
  const form = useFormContext<OnboardingSchemaInput>();

  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    const isValid = await form.trigger("height");

    if (isValid) {
      nextStep();
    }
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Que é sua altura?</Step.Title>
        <Step.Subtitle>Você pode inserir uma estimativa</Step.Subtitle>
      </Step.Header>

      <Step.Content position="center">
        <Controller
          control={form.control}
          name="height"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Altura (cm)"
              style={{ width: "100%" }}
              error={fieldState.error?.message}
            >
              <Input
                autoFocus
                inputMode="numeric"
                placeholder="175"
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
