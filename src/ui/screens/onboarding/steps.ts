import type { OnboardingStackParamList } from "@/ui/screens/onboarding/onboarding-stack";

export const orderedSteps: (keyof OnboardingStackParamList)[] = [
  "Goal",
  "BiologicalSex",
  "Birthdate",
  "Height",
  "Weight",
  "ActivityLevel",
  "CreateAccount",
];

export const TOTAL_STEPS = orderedSteps.length;
