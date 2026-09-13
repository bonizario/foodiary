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
};

export function Input({
  style,
  onFocus,
  onBlur,
  error,
  disabled,
  component: Component = TextInput,
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
      readOnly={disabled}
      {...props}
    />
  );
}
