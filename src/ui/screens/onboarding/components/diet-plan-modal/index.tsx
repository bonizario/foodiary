import { Modal, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { GoalStats } from "@/ui/components/goal-stats";
import { styles } from "@/ui/screens/onboarding/components/diet-plan-modal/styles";
import { theme } from "@/ui/styles/theme";

export function DietPlanModal() {
  return (
    <Modal visible transparent statusBarTranslucent animationType="fade">
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>🥦</AppText>
                </View>
                <View style={styles.headerContent}>
                  <AppText
                    color={theme.colors.gray[100]}
                    align="center"
                    fontSize="3xl"
                    weight="semibold"
                    style={styles.title}
                  >
                    Seu plano de dieta para <Text style={styles.titleHighlight}>Perder Peso</Text>{" "}
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
                  calories={{ goal: 2000, current: 1500 }}
                  proteins={{ goal: 150, current: 100 }}
                  carbohydrates={{ goal: 250, current: 200 }}
                  fats={{ goal: 70, current: 50 }}
                />
              </View>
            </View>
            <View style={styles.footer}>
              <Button>Começar meu plano</Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
