import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Logo } from "@/ui/components/logo";
import { theme } from "@/ui/styles/theme";

import loadingAnimation from "./loading-animation.mp4";
import { styles } from "./styles";

type ProcessingMealModalProps = {
  type: "audio" | "image";
};

export function ProcessingMealModal({ type }: ProcessingMealModalProps) {
  const player = useVideoPlayer(loadingAnimation, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView nativeControls={false} player={player} style={styles.video} />

      <View style={styles.content}>
        <Logo height={24} width={75} />
        <AppText align="center" color={theme.colors.gray[300]}>
          {type === "audio" ? "Processando seu áudio..." : "Analisando a sua foto..."}
        </AppText>
      </View>
    </View>
  );
}
