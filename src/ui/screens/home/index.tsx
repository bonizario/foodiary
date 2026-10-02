import { View } from "react-native";

import { useAuth } from "@/app/contexts/auth-context/use-auth";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";

export function Home() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppText>Home Screen</AppText>
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
}
