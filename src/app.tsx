import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Welcome } from "@/ui/screens/welcome";

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
    <SafeAreaProvider>
      <Welcome />
    </SafeAreaProvider>
  );
}
