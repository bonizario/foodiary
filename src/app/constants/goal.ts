export const Goal = {
  LOSE: "LOSE",
  MAINTAIN: "MAINTAIN",
  GAIN: "GAIN",
} as const;

export type Goal = (typeof Goal)[keyof typeof Goal];
