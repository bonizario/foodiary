// import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
// import { useMeal } from '@app/hooks/queries/useMeal';
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert } from "react-native";

import { MealStatus } from "@/app/constants/meal";
import { AppStackNavigationProps } from "@/app/navigation/app-stack";

type UsePictureModalControllerParams = {
  onClose: () => void;
  onCreate?: () => void;
};

function useMeal(mealId: string) {
  return {
    meal: {
      id: "id",
      status: "SUCCESS",
    },
    isLoading: false,
    isProcessing: false,
  };
}

function useCreateMeal() {
  return {
    createMeal: async (audioUri: string) => {
      // Simulate meal creation
      console.log("Creating meal with audioUri:", audioUri);
      return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    },
    isLoading: false,
    createdMealId: "id",
  };
}

export function usePictureModalController({ onClose, onCreate }: UsePictureModalControllerParams) {
  const cameraRef = useRef<CameraView | null>(null);

  const [pictureUri, setPictureUri] = useState<null | string>(null);

  const [permission, handleRequestPermission] = useCameraPermissions();

  const { navigate } = useNavigation<AppStackNavigationProps>();

  const queryClient = useQueryClient();

  const memoizedOnCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    memoizedOnCloseRef.current = onClose;
  }, [onClose]);

  const memoizedOnCreateRef = useRef(onCreate);
  useLayoutEffect(() => {
    memoizedOnCreateRef.current = onCreate;
  }, [onCreate]);

  const { createMeal, isLoading: isCreatingMeal, createdMealId } = useCreateMeal();
  const { meal, isLoading: isLoadingMeal, isProcessing: isProcessingMeal } = useMeal(createdMealId);

  useEffect(() => {
    if (meal?.status === MealStatus.FAILED) {
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente!");
    }

    if (meal?.status === MealStatus.SUCCESS) {
      memoizedOnCloseRef.current();
      memoizedOnCreateRef.current?.();
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      // navigate('MealDetails', { mealId: meal.id });
    }
  }, [meal?.status, meal?.id, navigate, queryClient]);

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({ imageType: "jpg" });

    setPictureUri(picture.uri);
  }

  function handleTryAgain() {
    setPictureUri(null);
  }

  async function handleConfirm() {
    if (!pictureUri) {
      return;
    }

    try {
      await createMeal(pictureUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente.");
    }
  }

  return {
    cameraRef,
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    permission,
    pictureUri,
    handleConfirm,
    handleRequestPermission,
    handleTakePicture,
    handleTryAgain,
  };
}
