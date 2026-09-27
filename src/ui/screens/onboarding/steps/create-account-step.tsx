import { isAxiosError } from "axios";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Alert, View, type TextInput } from "react-native";

import { ErrorCode } from "@/app/constants/error-code";
import { AuthService } from "@/app/services/auth-service";

import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { Step } from "@/ui/screens/onboarding/components/step";
import type { OnboardingSchemaInput, OnboardingSchemaOutput } from "@/ui/screens/onboarding/schema";

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const form = useFormContext<OnboardingSchemaInput, unknown, OnboardingSchemaOutput>();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await AuthService.signUp({
        account: {
          email: data.account.email,
          password: data.account.password,
        },
        profile: {
          name: data.account.name,
          goal: data.goal,
          birthdate: data.birthdate,
          biologicalSex: data.biologicalSex,
          height: data.height,
          weight: data.weight,
          activityLevel: data.activityLevel,
        },
      });

      console.log(response);
    } catch (error) {
      // TODO: improve error handling UX
      if (
        isAxiosError(error) &&
        error.response?.data?.error?.code === ErrorCode.EMAIL_ALREADY_IN_USE
      ) {
        Alert.alert("Oops!", "Este e-mail já está em uso");
        return;
      }
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua conta");
    }
  });

  return (
    <Step>
      <Step.Header>
        <Step.Title>Crie sua conta</Step.Title>
        <Step.Subtitle>Para poder visualizar seu progresso</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <View style={{ gap: 24 }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup label="Nome" error={fieldState.error?.message}>
                <Input
                  autoFocus
                  placeholder="João Silva"
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  ref={emailInputRef}
                  placeholder="joao.silva@example.com"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  ref={passwordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup label="Confirmar Senha" error={fieldState.error?.message}>
                <Input
                  ref={confirmPasswordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </Step.Content>

      <Step.Footer align="start">
        <Button
          onPress={handleSubmit}
          style={{ width: "100%" }}
          isLoading={form.formState.isSubmitting}
        >
          Criar conta
        </Button>
      </Step.Footer>
    </Step>
  );
}
