import { CameraIcon, MicIcon, type LucideIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Platform, Pressable, View } from "react-native";

import { MealInputType } from "@/app/constants/meal";

import { AppText } from "@/ui/components/app-text";
import { AudioModal } from "@/ui/components/audio-modal";
import { PictureModal } from "@/ui/components/picture-modal";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

type CreateMealOptionsProps = {
  disabled?: boolean;
  onCreate?: () => void;
};

export function CreateMealOptions({ disabled = false, onCreate }: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] = useState<MealInputType | null>(null);

  const handleOpenModal = useCallback((inputType: MealInputType) => {
    setCurrentVisibleModal(inputType);
  }, []);

  const handleCloseModal = useCallback(() => {
    setCurrentVisibleModal(null);
  }, []);

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === MealInputType.AUDIO}
        onClose={handleCloseModal}
        onCreate={onCreate}
      />
      <PictureModal
        visible={currentVisibleModal === MealInputType.IMAGE}
        onClose={handleCloseModal}
        onCreate={onCreate}
      />
      <OptionButton
        icon={MicIcon}
        label="Áudio"
        disabled={disabled}
        onPress={() => handleOpenModal(MealInputType.AUDIO)}
      />
      <OptionButton
        icon={CameraIcon}
        label="Foto"
        disabled={disabled}
        onPress={() => handleOpenModal(MealInputType.IMAGE)}
      />
    </View>
  );
}

type OptionButtonProps = {
  disabled: boolean;
  icon: LucideIcon;
  label: string;
  onPress: () => void;
};

function OptionButton({ disabled, icon: Icon, label, onPress }: OptionButtonProps) {
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
