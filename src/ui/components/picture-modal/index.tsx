import { CameraView } from "expo-camera";
import { CameraIcon, CheckIcon, Trash2Icon, UnlockIcon, XIcon } from "lucide-react-native";
import type { RefObject } from "react";
import { Image, Modal, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MealInputType } from "@/app/constants/meal";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { ProcessingMealModal } from "@/ui/components/processing-meal-modal";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";
import { usePictureModalController } from "./use-picture-modal-controller";

type PictureModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate?: () => void;
};

export function PictureModal({ visible, onClose, onCreate }: PictureModalProps) {
  const {
    cameraRef,
    isLoading,
    permission,
    pictureUri,
    handleConfirm,
    handleRequestPermission,
    handleTakePicture,
    handleTryAgain,
  } = usePictureModalController({ onClose, onCreate });

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <StatusBar animated barStyle="light-content" />

      {isLoading && <ProcessingMealModal inputType={MealInputType.IMAGE} />}

      {!isLoading && permission && (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.content}>
              <View style={styles.header}>
                <Button rippleStyle="light" size="icon" variant="neutral" onPress={onClose}>
                  <XIcon color={theme.colors.gray[500]} size={20} />
                </Button>
              </View>

              {!permission.granted && (
                <CameraPermission onRequestPermission={handleRequestPermission} />
              )}

              {permission.granted && (
                <>
                  <CameraPreview cameraRef={cameraRef} pictureUri={pictureUri} />

                  <View style={styles.footer}>
                    <View style={styles.actionsContainer}>
                      {pictureUri ? (
                        <View style={styles.actionsGroup}>
                          <TryAgain onTryAgain={handleTryAgain} />
                          <ConfirmPicture onConfirm={handleConfirm} />
                        </View>
                      ) : (
                        <TakePicture onTakePicture={handleTakePicture} />
                      )}
                    </View>
                  </View>
                </>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}

function CameraPermission({ onRequestPermission }: { onRequestPermission: () => void }) {
  return (
    <View style={styles.body}>
      <View style={styles.permissionContainer}>
        <CameraIcon color={theme.colors.gray[500]} size={32} />

        <AppText align="center" color={theme.colors.gray[500]} style={styles.permissionLabel}>
          Para registrar sua refeição com uma foto, precisamos de acesso à câmera do seu
          dispositivo.
        </AppText>
      </View>

      <Button leftIcon={UnlockIcon} onPress={onRequestPermission}>
        Conceder acesso
      </Button>
    </View>
  );
}

function CameraPreview({
  cameraRef,
  pictureUri,
}: {
  cameraRef: RefObject<CameraView | null>;
  pictureUri: string | null;
}) {
  return (
    <View style={styles.body}>
      {pictureUri ? (
        <Image source={{ uri: pictureUri }} style={styles.picture} />
      ) : (
        <CameraView facing="back" ref={cameraRef} style={styles.camera} />
      )}
    </View>
  );
}

function TakePicture({ onTakePicture }: { onTakePicture: () => void }) {
  return (
    <>
      <Button onPress={onTakePicture} rippleStyle="light" size="icon" variant="neutral">
        <CameraIcon color={theme.colors.lime[600]} size={20} />
      </Button>

      <AppText align="center" color={theme.colors.gray[500]} style={styles.actionLabel}>
        Tirar foto
      </AppText>
    </>
  );
}

function TryAgain({ onTryAgain }: { onTryAgain: () => void }) {
  return (
    <Button onPress={onTryAgain} rippleStyle="light" size="icon" variant="neutral">
      <Trash2Icon color={theme.colors.gray[500]} size={20} />
    </Button>
  );
}

function ConfirmPicture({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Button onPress={onConfirm} size="icon">
      <CheckIcon color={theme.colors.black[700]} size={20} />
    </Button>
  );
}
