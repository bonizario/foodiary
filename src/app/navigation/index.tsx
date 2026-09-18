import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "@/app/navigation/auth-stack";

export function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
