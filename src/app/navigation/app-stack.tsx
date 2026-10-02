import type { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Home } from "@/ui/screens/home";

type AppStackParamList = {
  Home: undefined;
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
    </Stack.Navigator>
  );
}
