import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { CreateMealOptions } from "@/ui/components/create-meal-options";
import { useHomeContext } from "@/ui/screens/home/context/use-home-context";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

export function EmptyState() {
  const { isFetching } = useHomeContext();

  return (
    <View style={[styles.container, { opacity: isFetching ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>
        Cadastre sua primeira refeição através de uma das opções abaixo:
      </AppText>

      <CreateMealOptions disabled={isFetching} />
    </View>
  );
}
