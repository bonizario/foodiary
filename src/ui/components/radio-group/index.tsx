import { createContext, use, type ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { styles } from "@/ui/components/radio-group/styles";
import { theme } from "@/ui/styles/theme";

type RadioGroupContextValue = {
  value: string;
  onChangeValue: (value: string) => void;
  isHorizontal: boolean;
  error: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: "",
  onChangeValue: () => {},
  isHorizontal: false,
  error: false,
});

type RadioGroupProps = {
  children: ReactNode;
  value: string;
  onChangeValue: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  error?: boolean;
};

export function RadioGroup({
  children,
  value,
  onChangeValue,
  orientation = "vertical",
  error = false,
}: RadioGroupProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <RadioGroupContext.Provider
      value={{ value, onChangeValue, isHorizontal, error }}
    >
      <View
        style={[styles.container, isHorizontal && styles.containerHorizontal]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.Item = RadioGroupItem;
RadioGroup.Icon = RadioGroupIcon;
RadioGroup.Label = RadioGroupLabel;
RadioGroup.Description = RadioGroupDescription;
RadioGroup.ItemInfo = RadioGroupItemInfo;

type RadioGroupItemProps = {
  children: ReactNode;
  value: string;
};

const RadioGroupItemContext = createContext({ isSelected: false });

function RadioGroupItem({ children, value }: RadioGroupItemProps) {
  const {
    value: selectedValue,
    onChangeValue,
    isHorizontal,
    error,
  } = use(RadioGroupContext);
  const isSelected = value === selectedValue;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={[
          styles.item,
          isHorizontal && styles.horizontalItem,
          isSelected && styles.selectedItem,
          error && styles.errorItem, // TODO: use create-variants instead of inline styles
        ]}
        onPress={() => onChangeValue(value)}
        activeOpacity={0.5}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

function RadioGroupIcon({ children }: { children: string }) {
  const { error } = use(RadioGroupContext);
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, (isSelected || error) && styles.whiteIconBg]}>
      <AppText>{children}</AppText>
    </View>
  );
}

function RadioGroupLabel({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      weight="semibold"
      style={[styles.label, isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  );
}

function RadioGroupDescription({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      fontSize="sm"
      color={theme.colors.gray[700]}
      style={[isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  );
}

function RadioGroupItemInfo({ children }: { children: ReactNode }) {
  return <View style={styles.itemInfo}>{children}</View>;
}
