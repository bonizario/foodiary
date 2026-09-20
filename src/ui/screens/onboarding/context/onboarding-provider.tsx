import { useCallback, useState, type ReactNode } from "react";

import { OnboardingContext } from "@/ui/screens/onboarding/context";
import { onboardingNavigation } from "@/ui/screens/onboarding/onboarding-stack";
import { orderedSteps } from "@/ui/screens/onboarding/steps";

type OnboardingProviderProps = {
  children: ReactNode;
};

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
      return;
    }

    onboardingNavigation.goBack();

    setCurrentStepIndex(previousStepIndex);
  }, [currentStepIndex]);

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
