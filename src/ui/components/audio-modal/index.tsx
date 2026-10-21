import { XIcon } from "lucide-react-native";
import { Modal, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MealInputType } from "@/app/types/meal";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { ProcessingMealModal } from "@/ui/components/processing-meal-modal";
import { theme } from "@/ui/styles/theme";

import { Actions } from "./actions";
import { styles } from "./styles";
import { useAudioModalController } from "./use-audio-modal-controller";

type AudioModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate?: () => void;
};

export function AudioModal({ visible, onClose, onCreate }: AudioModalProps) {
  const {
    audioUri,
    isLoading,
    state,
    handleConfirm,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
  } = useAudioModalController({ onClose, onCreate });

  const isRecording = state === "recording";

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <StatusBar animated barStyle="light-content" />

      {isLoading && <ProcessingMealModal inputType={MealInputType.AUDIO} />}

      {!isLoading && (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.content}>
              <View style={styles.header}>
                <Button onPress={onClose} size="icon" variant="neutral" rippleStyle="light">
                  <XIcon size={20} color={theme.colors.gray[500]} />
                </Button>
              </View>

              <View style={styles.body}>
                <View style={[styles.circle1, isRecording && styles.circle1Recording]}>
                  <View style={[styles.circle2, isRecording && styles.circle2Recording]}>
                    <View style={[styles.circle3, isRecording && styles.circle3Recording]} />
                  </View>
                </View>

                <AppText
                  align="center"
                  color={theme.colors.gray[500]}
                  style={styles.instructionsLabel}
                >
                  Tente dizer algo como: 200g de arroz, 100g de frango e salada
                </AppText>
              </View>

              <View style={styles.footer}>
                <View style={styles.actionsContainer}>
                  <Actions
                    audioUri={audioUri}
                    state={state}
                    onConfirm={handleConfirm}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    onTryAgain={handleTryAgain}
                  />
                </View>
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}
