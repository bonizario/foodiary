import { cloneElement, type ReactElement } from "react";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { styles } from "@/ui/components/form-group/styles";
import { theme } from "@/ui/styles/theme";

type FormGroupProps = {
  label: string;
  children: ReactElement<{ error?: boolean }>;
  error?: string;
};

export function FormGroup({ label, children, error }: FormGroupProps) {
  return (
    <View style={styles.container}>
      <AppText>{label}</AppText>
      {cloneElement(children, { error: !!error })}
      {error && (
        <AppText fontSize="sm" color={theme.colors.support.red}>
          {error}
        </AppText>
      )}
    </View>
  );
}
