import { KeyboardAvoidingView, Platform, View } from "react-native";

import type { AuthStackScreenProps } from "@/app/navigation/auth-stack";

import { OnboardingHeader } from "@/ui/screens/onboarding/components/onboarding-header";
import { OnboardingProvider } from "@/ui/screens/onboarding/context/onboarding-provider";
import { OnboardingStack } from "@/ui/screens/onboarding/onboarding-stack";
import { theme } from "@/ui/styles/theme";

export function Onboarding(props: AuthStackScreenProps<"Onboarding">) {
  return (
    <OnboardingProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <OnboardingHeader />
          <OnboardingStack />
        </View>
      </KeyboardAvoidingView>
    </OnboardingProvider>
  );
}
