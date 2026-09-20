import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";

import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";
import { formatDecimal } from "@/ui/utils/format-decimal";

export function WeightStep() {
  const [value, setValue] = useState(""); // TODO: remove after React Hook Form is introduced

  const { nextStep } = useOnboarding();

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Que é seu peso?</Step.Title>
        <Step.Subtitle>Você pode inserir uma estimativa</Step.Subtitle>
      </Step.Header>

      <Step.Content position="center">
        <FormGroup label="Peso (kg)" style={{ width: "100%" }}>
          <Input
            inputMode="numeric"
            placeholder="80"
            formatter={formatDecimal}
            value={value}
            onChangeText={setValue}
          />
        </FormGroup>
      </Step.Content>

      <Step.Footer>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </Step.Footer>
    </Step>
  );
}
