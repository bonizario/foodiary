export const BiologicalSex = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type BiologicalSex = (typeof BiologicalSex)[keyof typeof BiologicalSex];
