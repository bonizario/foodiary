import { useState, type ComponentRef, type ComponentType, type Ref } from "react";
import {
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
  type TextInputProps,
} from "react-native";

import { AppText } from "@/ui/components/app-text";
import { theme } from "@/ui/styles/theme";

import { inputStyles, styles } from "./styles";

type BaseTextInputProps = Omit<TextInputProps, "readOnly">;

type InputProps = BaseTextInputProps & {
  component?: ComponentType<TextInputProps>;
  disabled?: boolean;
  error?: boolean;
  formatter?: (value: string) => string;
  ref?: Ref<ComponentRef<typeof TextInput>>;
  suffix?: string;
};

export function Input({
  component: Component = TextInput,
  disabled,
  error,
  formatter,
  onBlur,
  onChangeText,
  onFocus,
  style,
  suffix,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent): void => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent): void => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChangeText = (value: string) => {
    const formattedValue = formatter?.(value) ?? value;
    onChangeText?.(formattedValue);
  };

  const input = (
    <Component
      style={[
        inputStyles({
          status: error ? "error" : isFocused ? "focus" : "default",
          disabled: disabled ? "true" : "false",
          hasSuffix: suffix ? "true" : "false",
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      readOnly={disabled}
      {...props}
    />
  );

  if (suffix) {
    return (
      <View style={styles.inputWithSuffix}>
        {input}
        <View style={styles.suffix}>
          <AppText color={theme.colors.gray[700]}>{suffix}</AppText>
        </View>
      </View>
    );
  }

  return input;
}
