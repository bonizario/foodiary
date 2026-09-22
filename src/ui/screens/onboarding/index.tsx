import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { OnboardingHeader } from "@/ui/screens/onboarding/components/onboarding-header";
import { OnboardingProvider } from "@/ui/screens/onboarding/context/onboarding-provider";
import { OnboardingStack } from "@/ui/screens/onboarding/onboarding-stack";
import {
  onboardingSchema,
  type OnboardingSchemaInput,
  type OnboardingSchemaOutput,
} from "@/ui/screens/onboarding/schema";
import { theme } from "@/ui/styles/theme";

export function Onboarding() {
  const form = useForm<OnboardingSchemaInput, unknown, OnboardingSchemaOutput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      birthdate: new Date(),
      height: "",
      weight: "",
      account: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    },
  });

  return (
    <FormProvider {...form}>
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
    </FormProvider>
  );
}
