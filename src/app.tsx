import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/app/contexts/auth-context/auth-provider";
import { Navigation } from "@/app/navigation";

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
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
