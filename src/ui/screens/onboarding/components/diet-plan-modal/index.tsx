import { useState } from "react";
import { Modal, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Goal } from "@/app/constants/goal";
import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { useAccount } from "@/app/hooks/queries/use-account";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { GoalStats } from "@/ui/components/goal-stats";
import { styles } from "@/ui/screens/onboarding/components/diet-plan-modal/styles";
import { theme } from "@/ui/styles/theme";

const goalDisplay = {
  [Goal.LOSE]: {
    icon: "🥦",
    label: "Perder Peso",
  },
  [Goal.MAINTAIN]: {
    icon: "🍍",
    label: "Manter Peso",
  },
  [Goal.GAIN]: {
    icon: "🥩",
    label: "Ganhar Peso",
  },
} as const;

export function DietPlanModal() {
  const { signedUp } = useAuth();

  const [visible, setVisible] = useState(signedUp);

  const { data: account } = useAccount();

  const handleClose = () => setVisible(false);

  const goal = goalDisplay[account!.profile.goal];

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>{goal.icon}</AppText>
                </View>
                <View style={styles.headerContent}>
                  <AppText
                    color={theme.colors.gray[100]}
                    align="center"
                    fontSize="3xl"
                    weight="semibold"
                    style={styles.title}
                  >
                    Seu plano de dieta para <Text style={styles.titleHighlight}>{goal.label}</Text>{" "}
                    está pronto!
                  </AppText>
                  <AppText color={theme.colors.gray[600]} align="center">
                    Essa é a recomendação diária recomendada para seu plano. Fique tranquilo, você
                    poderá editar depois caso deseje.
                  </AppText>
                </View>
              </View>

              <View style={styles.body}>
                <GoalStats
                  calories={{ goal: account!.goal.calories }}
                  proteins={{ goal: account!.goal.proteins }}
                  carbohydrates={{ goal: account!.goal.carbohydrates }}
                  fats={{ goal: account!.goal.fats }}
                />
              </View>
            </View>
            <View style={styles.footer}>
              <Button onPress={handleClose}>Começar meu plano</Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
