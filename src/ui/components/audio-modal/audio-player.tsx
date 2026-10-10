import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { CheckIcon, PauseIcon, PlayIcon, Trash2Icon } from "lucide-react-native";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { theme } from "@/ui/styles/theme";

import { formatSeconds } from "@/shared/functions/format-seconds";

import { styles } from "./styles";

type AudioPlayerProps = {
  audioUri: string;
  onConfirm: () => void;
  onTryAgain: () => void;
};

export function AudioPlayer({ audioUri, onConfirm, onTryAgain }: AudioPlayerProps) {
  const player = useAudioPlayer(audioUri);

  const { duration, playing, currentTime } = useAudioPlayerStatus(player);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.seekTo(0);
      player.play();
    }
  };

  return (
    <>
      <View style={styles.actionsGroup}>
        <Button onPress={onTryAgain} rippleStyle="light" size="icon" variant="neutral">
          <Trash2Icon color={theme.colors.gray[500]} size={20} />
        </Button>

        <Button onPress={handlePlayPause} rippleStyle="light" size="icon" variant="neutral">
          {playing ? (
            <PauseIcon color={theme.colors.lime[600]} fill={theme.colors.lime[600]} size={20} />
          ) : (
            <PlayIcon color={theme.colors.lime[600]} fill={theme.colors.lime[600]} size={20} />
          )}
        </Button>

        <Button size="icon" onPress={onConfirm}>
          <CheckIcon color={theme.colors.black[700]} size={20} />
        </Button>
      </View>

      <AppText align="center" color={theme.colors.gray[500]} style={styles.actionLabel}>
        {formatSeconds(currentTime)} / {formatSeconds(duration)}
      </AppText>
    </>
  );
}
