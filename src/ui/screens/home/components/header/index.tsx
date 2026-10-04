import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { CurrentGoal } from "@/ui/screens/home/components/current-goal";
import { DateSwitcher } from "@/ui/screens/home/components/date-switcher";
import { styles } from "@/ui/screens/home/components/header/styles";
import { UserHeader } from "@/ui/screens/home/components/user-header";
import { useHomeContext } from "@/ui/screens/home/context/use-home-context";

export function Header() {
  const { isFetching } = useHomeContext();

  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />
        <View>
          <View style={styles.divider} />
          <AppText weight="medium" style={[styles.mealsLabel, { opacity: isFetching ? 0.5 : 1 }]}>
            REFEIÇÕES
          </AppText>
        </View>
      </View>
    </View>
  );
}
