import { useState, type ComponentType, type Ref } from "react";
import {
  TextInput,
  type BlurEvent,
  type FocusEvent,
  type TextInputProps,
} from "react-native";

import { inputStyles } from "@/ui/components/input/styles";
import { theme } from "@/ui/styles/theme";

type BaseTextInputProps = Omit<TextInputProps, "readOnly">;

type InputProps = BaseTextInputProps & {
  error?: boolean;
  disabled?: boolean;
  component?: ComponentType<TextInputProps>;
  ref?: Ref<TextInput>;
  formatter?: (value: string) => string;
};

export function Input({
  style,
  onBlur,
  onChangeText,
  onFocus,
  error,
  disabled,
  component: Component = TextInput,
  formatter,
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

  return (
    <Component
      style={[
        inputStyles({
          status: error ? "error" : isFocused ? "focus" : "default",
          disabled: disabled ? "true" : "false",
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
}
