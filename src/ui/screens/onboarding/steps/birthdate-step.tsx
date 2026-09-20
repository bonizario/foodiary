import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { Step } from "@/ui/screens/onboarding/components/step";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { theme } from "@/ui/styles/theme";
import { formatDate } from "@/ui/utils/format-date";

export function BirthdateStep() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

  const { nextStep } = useOnboarding();

  const handleSelectDate = (_event: DateTimePickerEvent, newDate?: Date) => {
    if (!newDate) {
      return;
    }

    setDate(newDate);

    if (Platform.OS === "android") {
      setIsDatePickerVisible(false);
    }
  };

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Que dia você nasceu?</Step.Title>
        <Step.Subtitle>Cada faixa etária responde de forma única</Step.Subtitle>
      </Step.Header>

      <Step.Content position="center">
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            value={date}
            onChange={handleSelectDate}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
            <AppText
              weight="semibold"
              fontSize="3xl"
              color={theme.colors.gray[700]}
            >
              {formatDate(date)}
            </AppText>
          </TouchableOpacity>
        )}
      </Step.Content>

      <Step.Footer>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </Step.Footer>
    </Step>
  );
}
