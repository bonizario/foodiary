import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

import { MealStatus } from "@/app/types/meal";
import { useCreateMeal } from "@/app/hooks/mutations/use-create-meal";
import { useMeal } from "@/app/hooks/queries/use-meal";
import { AppStackNavigationProps } from "@/app/navigation/app-stack";

type UsePictureModalControllerParams = {
  onClose: () => void;
  onCreate?: () => void;
};

export function usePictureModalController({ onClose, onCreate }: UsePictureModalControllerParams) {
  const cameraRef = useRef<CameraView | null>(null);

  const [pictureUri, setPictureUri] = useState<null | string>(null);

  const [permission, handleRequestPermission] = useCameraPermissions();

  const { navigate } = useNavigation<AppStackNavigationProps>();

  const queryClient = useQueryClient();

  const { createdMealId, createMeal, isCreatingMeal } = useCreateMeal();

  const { meal, isFetchingMeal, isProcessingMeal } = useMeal(createdMealId);

  const handleConfirm = useCallback(async () => {
    if (!pictureUri) {
      return;
    }

    try {
      await createMeal(pictureUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente.");
    }
  }, [createMeal, pictureUri]);

  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({ imageType: "jpg" });

    setPictureUri(picture.uri);
  }, []);

  const handleTryAgain = useCallback(() => {
    setPictureUri(null);
  }, []);

  useEffect(
    function handleMealStatusChange() {
      if (meal?.status === MealStatus.FAILED) {
        Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente!");
      }

      if (meal?.status === MealStatus.SUCCESS) {
        onClose();
        onCreate?.();
        queryClient.invalidateQueries({ queryKey: ["meals"] });
        navigate("MealDetails", { mealId: meal.id });
      }
    },
    [meal?.id, meal?.status, navigate, onClose, onCreate, queryClient],
  );

  return {
    cameraRef,
    isLoading: isCreatingMeal || isFetchingMeal || isProcessingMeal,
    permission,
    pictureUri,
    handleConfirm,
    handleRequestPermission,
    handleTakePicture,
    handleTryAgain,
  };
}
