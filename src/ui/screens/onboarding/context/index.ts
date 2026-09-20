import { createContext } from "react";

export type OnboardingContextValue = {
  currentStepIndex: number;
  nextStep: () => void;
  previousStep: () => void;
};

export const OnboardingContext = createContext<OnboardingContextValue | null>(
  null,
);
