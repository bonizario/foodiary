import { useNavigation } from "@react-navigation/native";
import { TargetIcon } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

import { useAccount } from "@/app/hooks/queries/use-account";
import type { AppStackNavigationProps } from "@/app/navigation/app-stack";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

export function UserHeader() {
  const { account } = useAccount();

  const { navigate } = useNavigation<AppStackNavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.userInfo} onPress={() => navigate("EditProfile")}>
        <Image source={{ uri: "https://github.com/bonizario.png" }} style={styles.avatar} />

        <View style={styles.greetings}>
          <AppText color={theme.colors.gray[700]} fontSize="sm">
            Olá, 👋
          </AppText>
          <AppText weight="semibold">{account!.profile.name}</AppText>
        </View>
      </TouchableOpacity>

      <Button variant="ghost" leftIcon={TargetIcon} onPress={() => navigate("EditGoals")}>
        Metas
      </Button>
    </View>
  );
}
