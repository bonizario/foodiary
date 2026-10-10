import { ActivityIndicator, View } from "react-native";

import { Logo } from "@/ui/components/logo";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

export function FullScreenLoader() {
  return (
    <View style={styles.container}>
      <Logo width={187} height={60} />
      <ActivityIndicator size="large" color={theme.colors.white} />
    </View>
  );
}
