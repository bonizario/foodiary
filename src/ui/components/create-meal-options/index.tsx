import { CameraIcon, LucideIcon, MicIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { styles } from "@/ui/components/create-meal-options/styles";
import { theme } from "@/ui/styles/theme";

type CreateMealOptionsProps = {
  disabled?: boolean;
  onCreate?: () => void;
};

export function CreateMealOptions({ disabled = false, onCreate }: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] = useState<null | "audio" | "picture">(null);

  function handleOpenModal(modal: "audio" | "picture") {
    setCurrentVisibleModal(modal);
  }

  function handleCloseModal() {
    setCurrentVisibleModal(null);
  }

  return (
    <View style={styles.container}>
      {/* <AudioModal
        visible={currentVisibleModal === 'audio'}
        onClose={handleCloseModal}
        onCreate={onCreate}
      />
      <PictureModal
        visible={currentVisibleModal === 'picture'}
        onClose={handleCloseModal}
        onCreate={onCreate}
      /> */}

      <OptionButton
        icon={MicIcon}
        label="Áudio"
        disabled={disabled}
        onPress={() => handleOpenModal("audio")}
      />
      <OptionButton
        icon={CameraIcon}
        label="Foto"
        disabled={disabled}
        onPress={() => handleOpenModal("picture")}
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
