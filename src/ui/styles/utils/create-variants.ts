import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

type Variant = {
  [variant: string]: {
    [variantName: string]: Style;
  };
};

type CreateVariantsParams<TVariant extends Variant> = {
  base?: Style;
  variants: TVariant;
  defaultVariants: {
    [K in keyof TVariant]: keyof TVariant[K];
  };
};

export function createVariants<TVariant extends Variant>({
  base = {},
  variants,
  defaultVariants,
}: CreateVariantsParams<TVariant>) {
  return (selectedVariants?: {
    [K in keyof TVariant]?: keyof TVariant[K];
  }) => {
    let styles = { ...base };

    for (const [variant, variantsStyles] of Object.entries(variants)) {
      const variantName =
        selectedVariants?.[variant] ?? defaultVariants[variant];
      const selectedVariantStyles =
        variantsStyles[variantName as keyof typeof variantsStyles];

      styles = {
        ...styles,
        ...selectedVariantStyles,
      };
    }

    return styles;
  };
}

export type VariantProps<T extends ReturnType<typeof createVariants>> =
  NonNullable<Parameters<T>[0]>;
