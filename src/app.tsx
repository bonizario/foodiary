import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { theme } from "@/ui/styles/theme";

export function App() {
  const [isFontsLoaded] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppText weight="medium" fontSize="3xl" style={{ textAlign: "right" }}>
        Foodiary is an app for tracking your meals.
      </AppText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[500],
    alignItems: "center",
    justifyContent: "center",
  },
});
