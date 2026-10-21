import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { useCreateMeal } from "@/app/hooks/mutations/use-create-meal";
import { useMeal } from "@/app/hooks/queries/use-meal";
import type { AppStackNavigationProps } from "@/app/navigation/app-stack";
import { MealStatus } from "@/app/types/meal";

export type AudioModalState = "idle" | "recording" | "recorded";

type UseAudioModalControllerParams = {
  onClose: () => void;
  onCreate?: () => void;
};

export function useAudioModalController({ onClose, onCreate }: UseAudioModalControllerParams) {
  const [state, setState] = useState<AudioModalState>("idle");

  const [audioUri, setAudioUri] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY);

  const { navigate } = useNavigation<AppStackNavigationProps>();

  const queryClient = useQueryClient();

  const { createdMealId, createMeal, isCreatingMeal } = useCreateMeal();

  const { meal, isFetchingMeal, isProcessingMeal } = useMeal(createdMealId);

  const handleConfirm = useCallback(async () => {
    if (!audioUri) {
      return;
    }

    try {
      await createMeal(audioUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente.");
    }
  }, [audioUri, createMeal]);

  const handleStartRecording = useCallback(async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setState("recording");
  }, [audioRecorder]);

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);
    setState("recorded");
  }, [audioRecorder]);

  const handleTryAgain = useCallback(() => {
    setState("idle");
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

  useEffect(() => {
    async function requestMicrophonePermission() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert("Permissão para acessar o microfone negada");
      }

      setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    }

    void requestMicrophonePermission();
  }, []);

  return {
    audioUri,
    isLoading: isCreatingMeal || isFetchingMeal || isProcessingMeal,
    state,
    handleConfirm,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
  };
}
