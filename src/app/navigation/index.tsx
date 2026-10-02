import { NavigationContainer } from "@react-navigation/native";

import { RootStack } from "@/app/navigation/root-stack";

export function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
