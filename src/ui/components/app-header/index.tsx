import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

type AppHeaderProps = {
  title: string;
  rightAction?: ReactNode;
};

export function AppHeader({ title, rightAction }: AppHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={goBack} size="icon" variant="ghost">
        <ChevronLeftIcon color={theme.colors.black[700]} size={20} />
      </Button>

      <AppText align="center" fontSize="sm" style={styles.title}>
        {title}
      </AppText>

      <View style={styles.rightAction}>{rightAction}</View>
    </View>
  );
}
