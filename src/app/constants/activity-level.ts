export const ActivityLevel = {
  SEDENTARY: "SEDENTARY",
  LIGHT: "LIGHT",
  MODERATE: "MODERATE",
  HEAVY: "HEAVY",
  ATHLETE: "ATHLETE",
} as const;

export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];
