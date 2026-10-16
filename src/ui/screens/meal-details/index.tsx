import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";

import type { AppStackRouteProps } from "@/app/navigation/app-stack";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";

import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<"MealDetails">>();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={goBack}>Go Back</Button>
      <AppText>Meal: {params.mealId} </AppText>
    </View>
  );
}
