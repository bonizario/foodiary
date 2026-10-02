import type { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { AppStack } from "@/app/navigation/app-stack";
import { AuthStack } from "@/app/navigation/auth-stack";

type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export type RootStackRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  const { signedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signedIn ? (
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{ animationTypeForReplace: "push" }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ animationTypeForReplace: "pop" }}
        />
      )}
    </Stack.Navigator>
  );
}
