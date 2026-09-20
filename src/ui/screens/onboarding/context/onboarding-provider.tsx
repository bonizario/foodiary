import { useNavigation } from "@react-navigation/native";
import { useCallback, useState, type ReactNode } from "react";

import type { AuthStackNavigationProps } from "@/app/navigation/auth-stack";

import { OnboardingContext } from "@/ui/screens/onboarding/context";
import { onboardingNavigation } from "@/ui/screens/onboarding/onboarding-stack";
import { orderedSteps } from "@/ui/screens/onboarding/steps";

type OnboardingProviderProps = {
  children: ReactNode;
};

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { goBack } = useNavigation<AuthStackNavigationProps>();

  const nextStep = useCallback(() => {
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = orderedSteps[nextStepIndex];

    if (!nextStep) {
      return;
    }

    onboardingNavigation.navigate(nextStep);

    setCurrentStepIndex(nextStepIndex);
  }, [currentStepIndex]);

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1;

    if (!onboardingNavigation.canGoBack()) {
      goBack();
      return;
    }

    onboardingNavigation.goBack();

    setCurrentStepIndex(previousStepIndex);
  }, [currentStepIndex, goBack]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStepIndex,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
