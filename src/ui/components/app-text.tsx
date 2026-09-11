import type { ComponentProps } from "react";
import { Text } from "react-native";

import { theme } from "@/ui/styles/theme";

type AppTextProps = ComponentProps<typeof Text> & {
  color?: string;
  fontFamily?: keyof typeof theme.fontFamily;
  fontSize?: keyof typeof theme.fontSize;
  weight?: keyof typeof theme.fontFamily.sans;
};

export function AppText({
  color = theme.colors.black[700],
  fontFamily = "sans",
  fontSize = "base",
  weight = "regular",
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        {
          color,
          fontFamily: theme.fontFamily[fontFamily][weight],
          fontSize: theme.fontSize[fontSize],
        },
        style,
      ]}
      {...props}
    />
  );
}
