import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationIndependentTree,
  type RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { ActivityLevelStep } from "@/ui/screens/onboarding/steps/activity-level-step";
import { BiologicalSexStep } from "@/ui/screens/onboarding/steps/biological-sex-step";
import { BirthdateStep } from "@/ui/screens/onboarding/steps/birthdate-step";
import { CreateAccountStep } from "@/ui/screens/onboarding/steps/create-account-step";
import { GoalStep } from "@/ui/screens/onboarding/steps/goal-step";
import { HeightStep } from "@/ui/screens/onboarding/steps/height-step";
import { WeightStep } from "@/ui/screens/onboarding/steps/weight-step";

export type OnboardingStackParamList = {
  Goal: undefined;
  BiologicalSex: undefined;
  Birthdate: undefined;
  Height: undefined;
  Weight: undefined;
  ActivityLevel: undefined;
  CreateAccount: undefined;
};

export type OnboardingStackNavigationProps =
  NativeStackNavigationProp<OnboardingStackParamList>;

export type OnboardingStackScreenProps<
  RouteName extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, RouteName>;

export type OnboardingStackRouteProps<
  RouteName extends keyof OnboardingStackParamList,
> = RouteProp<OnboardingStackParamList, RouteName>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const onboardingNavigation =
  createNavigationContainerRef<OnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={onboardingNavigation}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Goal"
        >
          <Stack.Screen name="Goal" component={GoalStep} />
          <Stack.Screen name="BiologicalSex" component={BiologicalSexStep} />
          <Stack.Screen name="Birthdate" component={BirthdateStep} />
          <Stack.Screen name="Height" component={HeightStep} />
          <Stack.Screen name="Weight" component={WeightStep} />
          <Stack.Screen name="ActivityLevel" component={ActivityLevelStep} />
          <Stack.Screen name="CreateAccount" component={CreateAccountStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
