import { View } from "react-native";

import type { AuthStackScreenProps } from "@/app/navigation/auth-stack";

import { AppText } from "@/ui/components/app-text";

export function Onboarding(props: AuthStackScreenProps<"Onboarding">) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText fontSize="3xl" weight="semibold"></AppText>
    </View>
  );
}
