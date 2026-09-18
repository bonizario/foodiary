import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { AuthStackNavigationProps } from "@/app/navigation/auth-stack";

import welcomeBg from "@/ui/assets/welcome-bg/image.jpg";
import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { Logo } from "@/ui/components/logo";
import {
  SignInBottomSheet,
  SignInBottomSheetRef,
} from "@/ui/components/sign-in-bottom-sheet";
import { styles } from "@/ui/screens/welcome/styles";
import { theme } from "@/ui/styles/theme";

export function Welcome() {
  const signInBottomSheetRef = useRef<SignInBottomSheetRef>(null);

  const navigation = useNavigation<AuthStackNavigationProps>();

  const handleCreateAccount = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <>
      <ImageBackground
        source={welcomeBg}
        resizeMode="cover"
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <Logo />
          <View style={styles.ctaWrapper}>
            <AppText
              color={theme.colors.white}
              weight="semibold"
              fontSize="3xl"
              style={styles.heading}
            >
              Controle sua dieta de forma simples
            </AppText>
            <View style={styles.ctaContainer}>
              <Button onPress={handleCreateAccount}>Criar conta</Button>
              <View style={styles.signInContainer}>
                <AppText color={theme.colors.white}>Já tem conta?</AppText>
                <TouchableOpacity
                  onPress={() => signInBottomSheetRef.current?.open()}
                >
                  <AppText color={theme.colors.lime[500]} weight="medium">
                    Acesse sua conta
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInBottomSheetRef} />
    </>
  );
}
