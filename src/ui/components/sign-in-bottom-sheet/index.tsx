import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { Ref } from "react";
import { Controller } from "react-hook-form";
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
  const { bottom, bottomSheetModalRef, form, handleSubmit, passwordInputRef } =
    useSignInBottomSheetController(ref);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText fontSize="3xl" weight="semibold" style={styles.heading}>
            Acesse sua conta
          </AppText>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormGroup label="Email" error={fieldState.error?.message}>
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
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormGroup label="Senha" error={fieldState.error?.message}>
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
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </FormGroup>
              )}
            />
            <Button onPress={handleSubmit}>Entrar</Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
