import type { LucideIcon } from "lucide-react-native";
import type { ComponentProps, ReactNode } from "react";
import { ActivityIndicator, Platform, Pressable, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import {
  buttonStyles,
  styles,
  type ButtonVariants,
} from "@/ui/components/button/styles";
import { theme } from "@/ui/styles/theme";

type ButtonProps = Omit<ComponentProps<typeof Pressable>, "children"> &
  ButtonVariants & {
    children?: ReactNode;
    isLoading?: boolean;
    leftIcon?: LucideIcon;
    rippleStyle?: "light" | "dark";
  };

export function Button({
  children,
  variant,
  size,
  disabled,
  style,
  isLoading,
  leftIcon: LeftIcon,
  rippleStyle = "dark",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const childrenElement =
    typeof children === "string" ? (
      <AppText weight="medium">{children}</AppText>
    ) : (
      children
    );

  return (
    <View style={styles.wrapper}>
      <Pressable
        android_ripple={{
          foreground: true,
          color:
            rippleStyle === "dark"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        }}
        style={({ pressed }) => [
          buttonStyles({
            variant,
            size,
            disabled: isDisabled ? "true" : "false",
          }),
          pressed && Platform.OS === "ios" && { opacity: 0.7 },
          typeof style === "function" ? style({ pressed }) : style,
        ]}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.black[700]} />
        ) : (
          <View style={styles.content}>
            {LeftIcon && <LeftIcon color={theme.colors.black[700]} size={20} />}
            {childrenElement}
          </View>
        )}
      </Pressable>
    </View>
  );
}
