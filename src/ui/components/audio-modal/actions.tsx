import { MicIcon, SquareIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { theme } from "@/ui/styles/theme";

import { formatSeconds } from "@/shared/functions/format-seconds";

import { AudioPlayer } from "./audio-player";
import { styles } from "./styles";
import type { AudioModalState } from "./use-audio-modal-controller";

type ActionsProps = {
  audioUri: string | null;
  state: AudioModalState;
  onConfirm: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTryAgain: () => void;
};

const MAX_AUDIO_DURATION = 30;

export function Actions({
  audioUri,
  state,
  onConfirm,
  onStartRecording,
  onStopRecording,
  onTryAgain,
}: ActionsProps) {
  const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

  const handleTryAgain = () => {
    setRecordingTimeInSeconds(0);
    onTryAgain();
  };

  useEffect(() => {
    if (state !== "recording") {
      return;
    }

    const intervalId = setInterval(
      () => setRecordingTimeInSeconds((prevState) => prevState + 1),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [state]);

  useEffect(() => {
    if (recordingTimeInSeconds >= MAX_AUDIO_DURATION) {
      onStopRecording();
    }
  }, [recordingTimeInSeconds, onStopRecording]);

  if (state === "idle") {
    return (
      <>
        <Button onPress={onStartRecording} rippleStyle="light" size="icon" variant="neutral">
          <MicIcon color={theme.colors.lime[600]} size={20} />
        </Button>

        <AppText align="center" color={theme.colors.gray[500]} style={styles.actionLabel}>
          Clique no microfone para começar a gravar
        </AppText>
      </>
    );
  }

  if (state === "recording") {
    return (
      <>
        <Button onPress={onStopRecording} rippleStyle="light" size="icon" variant="neutral">
          <SquareIcon color={theme.colors.lime[600]} fill={theme.colors.lime[600]} size={20} />
        </Button>

        <AppText align="center" color={theme.colors.gray[500]} style={styles.actionLabel}>
          {formatSeconds(recordingTimeInSeconds)}
        </AppText>
      </>
    );
  }

  if (state === "recorded" && audioUri) {
    return <AudioPlayer audioUri={audioUri} onConfirm={onConfirm} onTryAgain={handleTryAgain} />;
  }

  return null;
}
