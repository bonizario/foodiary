import { useRoute } from "@react-navigation/native";
import { FlatList, View } from "react-native";

import { useMeal } from "@/app/hooks/queries/use-meal";
import type { AppStackRouteProps } from "@/app/navigation/app-stack";

import { AppText } from "@/ui/components/app-text";
import { Skeleton } from "@/ui/components/skeleton";

import { Header } from "./components/header";
import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<"MealDetails">>();

  const { meal, isFetchingMeal } = useMeal(params.mealId);

  return (
    <View style={styles.container}>
      <FlatList
        data={meal?.foods ?? []}
        ListHeaderComponent={<Header meal={meal} isLoading={isFetchingMeal} />}
        ListEmptyComponent={
          isFetchingMeal ? (
            <>
              <View style={styles.food}>
                <Skeleton />
              </View>
              <View style={styles.separator} />
              <View style={styles.food}>
                <Skeleton />
              </View>
              <View style={styles.separator} />
              <View style={styles.food}>
                <Skeleton />
              </View>
              <View style={styles.separator} />
              <View style={styles.food}>
                <Skeleton />
              </View>
            </>
          ) : undefined
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: food }) => (
          <View style={styles.food}>
            <AppText>
              {food.quantity} {food.name}
            </AppText>
          </View>
        )}
      />
    </View>
  );
}
