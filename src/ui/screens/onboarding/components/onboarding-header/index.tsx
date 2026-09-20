import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/ui/components/button";
import { styles } from "@/ui/screens/onboarding/components/onboarding-header/styles";
import { useOnboarding } from "@/ui/screens/onboarding/context/use-onboarding";
import { TOTAL_STEPS } from "@/ui/screens/onboarding/steps";
import { theme } from "@/ui/styles/theme";

export function OnboardingHeader() {
  const { top } = useSafeAreaInsets();
  const { currentStepIndex, previousStep } = useOnboarding();

  const [widthAnimation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: ((currentStepIndex + 1) * 100) / TOTAL_STEPS,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStepIndex, widthAnimation]);

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Button size="icon" variant="ghost" onPress={previousStep}>
        <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
      </Button>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarForeground,
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  );
}
