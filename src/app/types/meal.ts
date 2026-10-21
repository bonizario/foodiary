export const MealStatus = {
  UPLOADING: "UPLOADING",
  QUEUED: "QUEUED",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type MealStatus = (typeof MealStatus)[keyof typeof MealStatus];

export const MealInputType = {
  AUDIO: "AUDIO",
  IMAGE: "IMAGE",
} as const;

export type MealInputType = (typeof MealInputType)[keyof typeof MealInputType];

export type Food = {
  name: string;
  quantity: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
};

export type Meal = {
  id: string;
  status: MealStatus;
  inputType: MealInputType;
  inputFileUrl: string;
  name: string;
  icon: string;
  foods: Food[];
  createdAt: Date;
};

export type SimplifiedMeal = {
  id: string;
  createdAt: Date;
  name: string;
  icon: string;
  foods: Food[];
};
