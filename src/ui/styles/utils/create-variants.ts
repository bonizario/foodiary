import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

type Variant = {
  [variant: string]: {
    [variantName: string]: Style;
  };
};

type Variants<TVariant extends Variant> = {
  [K in keyof TVariant]: keyof TVariant[K];
};

type CreateVariantsParams<TVariant extends Variant> = {
  base?: Style;
  variants: TVariant;
  defaultVariants: Variants<TVariant>;
};

export function createVariants<TVariant extends Variant>({
  base = {},
  variants,
  defaultVariants,
}: CreateVariantsParams<TVariant>) {
  return (selectedVariants?: Partial<Variants<TVariant>>) =>
    Object.entries(variants).reduce<Style>(
      (styles, [variant, variantStyles]) => {
        const variantName =
          selectedVariants?.[variant as keyof TVariant] ??
          defaultVariants[variant as keyof TVariant];

        return {
          ...styles,
          ...variantStyles[variantName],
        };
      },
      { ...base },
    );
}

export type VariantProps<T extends ReturnType<typeof createVariants>> =
  NonNullable<Parameters<T>[number]>;
