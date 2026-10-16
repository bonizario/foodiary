import { TargetIcon } from "lucide-react-native";
import { Image, View } from "react-native";

import { useAccount } from "@/app/hooks/queries/use-account";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

export function UserHeader() {
  const { account } = useAccount();

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: "https://github.com/bonizario.png" }} style={styles.avatar} />
        <View style={styles.greetings}>
          <AppText color={theme.colors.gray[700]} fontSize="sm">
            Olá, 👋
          </AppText>
          <AppText weight="semibold">{account?.profile.name}</AppText>
        </View>
      </View>
      <Button onPress={() => {}} variant="ghost" leftIcon={TargetIcon}>
        Metas
      </Button>
    </View>
  );
}
