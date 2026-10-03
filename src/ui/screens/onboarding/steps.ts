import type { OnboardingStackParamList } from "@/ui/screens/onboarding/onboarding-stack";

export const Steps = [
  "Goal",
  "BiologicalSex",
  "Birthdate",
  "Height",
  "Weight",
  "ActivityLevel",
  "CreateAccount",
] as const satisfies (keyof OnboardingStackParamList)[];
