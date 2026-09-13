import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { Ref } from "react";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { styles } from "@/ui/components/sign-in-bottom-sheet/styles";
import { useSignInBottomSheetController } from "@/ui/components/sign-in-bottom-sheet/use-sign-in-bottom-sheet-controller";

export type SignInBottomSheetRef = {
  open: () => void;
};

type SignInBottomSheetProps = {
  ref: Ref<SignInBottomSheetRef>;
};

export function SignInBottomSheet({ ref }: SignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef, handleSubmit, passwordInputRef } =
    useSignInBottomSheetController(ref);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText fontSize="3xl" weight="semibold" style={styles.heading}>
            Acesse sua conta
          </AppText>

          <View style={styles.form}>
            <FormGroup label="Email">
              <Input
                component={BottomSheetTextInput}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                inputMode="email"
                keyboardType="email-address"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                returnKeyType="next"
                spellCheck={false}
                textContentType="emailAddress"
              />
            </FormGroup>
            <FormGroup label="Senha">
              <Input
                component={BottomSheetTextInput}
                ref={passwordInputRef}
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect={false}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                secureTextEntry
                spellCheck={false}
                textContentType="password"
              />
            </FormGroup>
            <Button onPress={handleSubmit}>Entrar</Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
