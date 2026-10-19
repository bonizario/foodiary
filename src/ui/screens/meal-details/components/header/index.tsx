import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon } from "lucide-react-native";
import { useMemo } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";

import { MealInputType, type Meal } from "@/app/constants/meal";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { Skeleton } from "@/ui/components/skeleton";
import { useSafeArea } from "@/ui/hooks/use-safe-area";
import { theme } from "@/ui/styles/theme";

import { calculateMealMacros } from "@/shared/functions/calculate-meal-macros";

import { styles } from "./styles";

type HeaderProps = {
  isLoading: boolean;
  meal?: Meal | null;
};

export function Header({ isLoading, meal }: HeaderProps) {
  const { top } = useSafeArea();

  const { goBack } = useNavigation();

  const macros = useMemo(() => calculateMealMacros(meal?.foods), [meal?.foods]);

  const isPictureInput = meal?.inputType === MealInputType.IMAGE;

  return (
    <>
      <StatusBar animated barStyle="light-content" />

      <View style={styles.container}>
        {isPictureInput && (
          <View style={styles.imageBackground}>
            <Image source={{ uri: meal.inputFileUrl }} style={StyleSheet.absoluteFill} />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.imageOverlay, { paddingTop: top + 12 }]}
            >
              <BlurView intensity={35} style={styles.blurView}>
                <Button onPress={goBack} size="icon" variant="ghost">
                  <ChevronLeftIcon color={theme.colors.white} size={20} />
                </Button>
              </BlurView>
            </LinearGradient>
          </View>
        )}

        <View
          style={[
            styles.content,
            { marginTop: isPictureInput ? 0 : top, paddingLeft: isPictureInput ? 16 : 0 },
          ]}
        >
          <View style={styles.pageTitleContainer}>
            {!isPictureInput && (
              <Button onPress={goBack} size="icon" variant="ghost">
                <ChevronLeftIcon color={theme.colors.white} size={20} />
              </Button>
            )}
            <AppText color={theme.colors.white} weight="medium">
              Refeição
            </AppText>
          </View>
          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>Calorias</AppText>
            <Skeleton isLoading={isLoading} width={61} height={24} colorMode="dark">
              <AppText color={theme.colors.white} weight="medium">
                {macros.calories}kcal
              </AppText>
            </Skeleton>
          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
          <Skeleton isLoading={isLoading} width={96} height={24}>
            <AppText weight="medium" color={theme.colors.support.teal}>
              {macros.proteins.grams}g ({macros.proteins.percentage}%)
            </AppText>
          </Skeleton>
        </View>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
          <Skeleton isLoading={isLoading} width={96} height={24}>
            <AppText weight="medium" color={theme.colors.support.yellow}>
              {macros.carbohydrates.grams}g ({macros.carbohydrates.percentage}%)
            </AppText>
          </Skeleton>
        </View>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
          <Skeleton isLoading={isLoading} width={96} height={24}>
            <AppText weight="medium" color={theme.colors.support.orange}>
              {macros.fats.grams}g ({macros.fats.percentage}%)
            </AppText>
          </Skeleton>
        </View>
      </View>

      <View style={styles.macrosProgressContainer}>
        <Skeleton isLoading={isLoading} width="100%" height={4}>
          <View style={styles.macrosProgress}>
            <View style={[styles.proteinProgress, { width: `${macros.proteins.percentage}%` }]} />
            <View
              style={[
                styles.carbohydratesProgress,
                { width: `${macros.carbohydrates.percentage}%` },
              ]}
            />
            <View style={[styles.fatsProgress, { width: `${macros.fats.percentage}%` }]} />
          </View>
        </Skeleton>
      </View>

      <View style={styles.divider} />

      <View style={styles.mealNameContainer}>
        <Skeleton isLoading={isLoading} width="50%" height={24}>
          <AppText fontSize="xl" style={styles.mealName} weight="semibold">
            {meal?.name}
          </AppText>
        </Skeleton>
      </View>

      <AppText color={theme.colors.gray[700]} style={styles.mealItemsHeader} weight="medium">
        Itens
      </AppText>
    </>
  );
}
