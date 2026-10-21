import type { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { EditGoals } from "@/ui/screens/edit-goals";
import { EditProfile } from "@/ui/screens/edit-profile";
import { Home } from "@/ui/screens/home";
import { MealDetails } from "@/ui/screens/meal-details";

type AppStackParamList = {
  Home: undefined;
  MealDetails: {
    mealId: string;
  };
  EditGoals: undefined;
  EditProfile: undefined;
};

export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamList>;

export type AppStackScreenProps<RouteName extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  RouteName
>;

export type AppStackRouteProps<RouteName extends keyof AppStackParamList> = RouteProp<
  AppStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
      <Stack.Screen name="EditGoals" component={EditGoals} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
