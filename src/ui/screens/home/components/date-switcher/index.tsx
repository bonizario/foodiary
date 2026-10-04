import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { styles } from "@/ui/screens/home/components/date-switcher/styles";
import { useHomeContext } from "@/ui/screens/home/context/use-home-context";
import { theme } from "@/ui/styles/theme";

export function DateSwitcher() {
  const { currentDate, isFetching, previousDay, nextDay } = useHomeContext();

  return (
    <View style={[styles.container, { opacity: isFetching ? 0.5 : 1 }]}>
      <Button size="icon" variant="ghost" onPress={previousDay} disabled={isFetching}>
        <ChevronLeftIcon />
      </Button>

      <AppText color={theme.colors.gray[700]} weight="medium" style={styles.selectedDate}>
        {formatDate(currentDate)}
      </AppText>

      <Button size="icon" variant="ghost" onPress={nextDay} disabled={isFetching}>
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
