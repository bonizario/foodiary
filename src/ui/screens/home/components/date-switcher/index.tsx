import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { styles } from "@/ui/screens/home/components/date-switcher/styles";
import { theme } from "@/ui/styles/theme";

export function DateSwitcher() {
  const date = new Date();

  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost">
        <ChevronLeftIcon />
      </Button>

      <AppText color={theme.colors.gray[700]} weight="medium" style={styles.selectedDate}>
        {formatDate(date)}
      </AppText>

      <Button size="icon" variant="ghost">
        <ChevronRightIcon />
      </Button>
    </View>
  );
}

function formatDate(date: Date): string {
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: isToday ? undefined : "long",
    day: "2-digit",
    month: "long",
  }).format(date);

  return `${isToday ? "Hoje, " : ""}${formattedDate}`.toUpperCase();
}
