import { View } from "react-native";

import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { useAccount } from "@/app/hooks/queries/use-account";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";

export function Home() {
  const { signOut } = useAuth();
  const { data: account, refetch } = useAccount();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppText>Bem vindo {account?.profile.name}</AppText>
      <AppText>Home Screen</AppText>
      <Button onPress={signOut}>Sair</Button>
      <Button onPress={() => refetch()}>Recarregar Conta</Button>
    </View>
  );
}
