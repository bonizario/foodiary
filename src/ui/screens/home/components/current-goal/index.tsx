import { View } from "react-native";

import { useAccount } from "@/app/hooks/queries/use-account";

import { GoalStats } from "@/ui/components/goal-stats";
import { styles } from "@/ui/screens/home/components/date-switcher/styles";

export function CurrentGoal() {
  const { data: account } = useAccount();

  return (
    <View style={styles.container}>
      <GoalStats
        calories={{ goal: account!.goal.calories }}
        proteins={{ goal: account!.goal.proteins }}
        carbohydrates={{ goal: account!.goal.carbohydrates }}
        fats={{ goal: account!.goal.fats }}
      />
    </View>
  );
}
