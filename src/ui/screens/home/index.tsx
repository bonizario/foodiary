import { FlatList, Platform, RefreshControl, View } from "react-native";

import { EmptyState } from "@/ui/screens/home/components/empty-state";
import { Fab } from "@/ui/screens/home/components/fab";
import { FullScreenLoader } from "@/ui/screens/home/components/full-screen-loader";
import { Header } from "@/ui/screens/home/components/header";
import { ItemSeparator } from "@/ui/screens/home/components/item-separator";
import { MealCard } from "@/ui/screens/home/components/meal-card";
import { HomeProvider } from "@/ui/screens/home/context/home-provider";
import { styles } from "@/ui/screens/home/styles";
import { useHomeController } from "@/ui/screens/home/use-home-controller";
import { DietPlanModal } from "@/ui/screens/onboarding/components/diet-plan-modal";
import { theme } from "@/ui/styles/theme";

export function Home() {
  const {
    top,
    bottom,
    currentDate,
    isFetching,
    isLoading,
    isRefreshing,
    meals,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  } = useHomeController();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "ios" ? top - 8 : top }]}>
      <DietPlanModal />

      <HomeProvider
        currentDate={currentDate}
        meals={meals}
        isFetching={isFetching}
        previousDay={handlePreviousDay}
        nextDay={handleNextDay}
      >
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
          ListHeaderComponent={<Header />}
          ListEmptyComponent={<EmptyState />}
          ItemSeparatorComponent={<ItemSeparator />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          }
          renderItem={({ item: meal }) => <MealCard meal={meal} />}
        />
      </HomeProvider>

      {meals.length > 0 && <Fab />}
    </View>
  );
}
