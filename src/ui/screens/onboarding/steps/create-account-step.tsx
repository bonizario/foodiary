import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View, type TextInput } from "react-native";

import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { Step } from "@/ui/screens/onboarding/components/step";
import type { OnboardingSchemaInput } from "@/ui/screens/onboarding/schema";

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const form = useFormContext<OnboardingSchemaInput>();

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting create account form");
    console.log(JSON.stringify(data, null, 2));
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
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
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
              <FormGroup
                label="Confirmar Senha"
                error={fieldState.error?.message}
              >
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
