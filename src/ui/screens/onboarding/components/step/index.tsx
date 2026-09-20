import type { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/ui/components/app-text";
import { styles } from "@/ui/screens/onboarding/components/step/styles";
import { theme } from "@/ui/styles/theme";

export function Step({ children }: { children: ReactNode }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {children}
    </View>
  );
}

function StepHeader({ children }: { children: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function StepTitle({ children }: { children: string }) {
  return (
    <AppText fontSize="3xl" weight="semibold" style={styles.title}>
      {children}
    </AppText>
  );
}

function StepSubtitle({ children }: { children: string }) {
  return (
    <AppText color={theme.colors.gray[700]} style={styles.subtitle}>
      {children}
    </AppText>
  );
}

type StepContentProps = {
  children: React.ReactNode;
  position?: "end" | "center";
};

function StepContent({ children, position = "end" }: StepContentProps) {
  return (
    <View
      style={[styles.content, position === "center" && styles.contentCenter]}
    >
      {children}
    </View>
  );
}

function StepFooter({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

Step.Header = StepHeader;
Step.Title = StepTitle;
Step.Subtitle = StepSubtitle;
Step.Content = StepContent;
Step.Footer = StepFooter;
