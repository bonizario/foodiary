import { CameraIcon, LucideIcon, MicIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { AudioModal } from "@/ui/components/audio-modal";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

const Modal = {
  AUDIO: "AUDIO",
  PICTURE: "PICTURE",
} as const;

type Modal = (typeof Modal)[keyof typeof Modal];

type CreateMealOptionsProps = {
  disabled?: boolean;
  onCreate?: () => void;
};

export function CreateMealOptions({ disabled = false, onCreate }: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] = useState<Modal | null>("AUDIO");

  function handleOpenModal(modal: Modal) {
    setCurrentVisibleModal(modal);
  }

  function handleCloseModal() {
    setCurrentVisibleModal(null);
  }

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === Modal.AUDIO}
        onClose={handleCloseModal}
        onCreate={onCreate}
      />
      {/* <PictureModal
        visible={currentVisibleModal === 'picture'}
        onClose={handleCloseModal}
        onCreate={onCreate}
      /> */}

      <OptionButton
        icon={MicIcon}
        label="Áudio"
        disabled={disabled}
        onPress={() => handleOpenModal(Modal.AUDIO)}
      />
      <OptionButton
        icon={CameraIcon}
        label="Foto"
        disabled={disabled}
        onPress={() => handleOpenModal(Modal.PICTURE)}
      />
    </View>
  );
}

type OptionButtonProps = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

function OptionButton({ icon: Icon, label, disabled, onPress }: OptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{ color: "rgba(0, 0, 0, 0.1)", foreground: true }}
        style={({ pressed }) => [
          styles.button,
          (disabled || (pressed && Platform.OS === "ios")) && { opacity: 0.5 },
        ]}
      >
        <View style={styles.icon}>
          <Icon color={theme.colors.black[700]} size={24} />
        </View>

        <AppText weight="semibold" style={styles.buttonLabel}>
          {label}
        </AppText>
      </Pressable>
    </View>
  );
}
