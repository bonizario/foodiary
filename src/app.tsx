import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

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
      <Text style={{ fontFamily: theme.fontFamily.sans.semiBold }}>
        Open up App.tsx to start working on your app!
      </Text>
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
