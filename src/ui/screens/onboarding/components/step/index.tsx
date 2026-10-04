import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { useSafeArea } from "@/ui/hooks/use-safe-area";
import { styles } from "@/ui/screens/onboarding/components/step/styles";
import { theme } from "@/ui/styles/theme";

export function Step({ children }: { children: ReactNode }) {
  const { bottom } = useSafeArea();

  return <View style={[styles.container, { paddingBottom: bottom }]}>{children}</View>;
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
    <ScrollView
      style={styles.contentScroll}
      contentContainerStyle={[styles.content, position === "center" && styles.contentCenter]}
      contentInset={{ bottom: 2 }}
      scrollIndicatorInsets={{ bottom: 2 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

type StepFooterProps = {
  children: ReactNode;
  align?: "start" | "end";
};

export function StepFooter({ children, align = "end" }: StepFooterProps) {
  return (
    <View style={[styles.footer, align === "end" && { alignItems: "flex-end" }]}>{children}</View>
  );
}

Step.Header = StepHeader;
Step.Title = StepTitle;
Step.Subtitle = StepSubtitle;
Step.Content = StepContent;
Step.Footer = StepFooter;
