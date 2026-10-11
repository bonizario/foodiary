// import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
// import { useMeal } from '@app/hooks/queries/useMeal';
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert } from "react-native";

import { MealStatus } from "@/app/constants/meal";
import type { AppStackNavigationProps } from "@/app/navigation/app-stack";

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
      return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    },
    isLoading: false,
    createdMealId: "id",
  };
}

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

  const handleStartRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setState("recording");
  };

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);
    setState("recorded");
  }, [audioRecorder]);

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

  const handleTryAgain = useCallback(() => {
    setState("idle");
  }, []);

  useEffect(() => {
    if (meal?.status === MealStatus.FAILED) {
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição! Tente novamente!");
    }

    if (meal?.status === MealStatus.SUCCESS) {
      memoizedOnCloseRef.current();
      memoizedOnCreateRef.current?.();
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      // navigate("MealDetails", { mealId: meal.id });
    }
  }, [meal?.status, meal?.id, navigate, queryClient]);

  useEffect(() => {
    async function load() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert("Permissão para acessar o microfone negada");
      }

      setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    }

    void load();
  }, []);

  return {
    audioUri,
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    state,
    handleConfirm,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
  };
}
