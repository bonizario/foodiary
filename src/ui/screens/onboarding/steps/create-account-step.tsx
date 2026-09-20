import { useRef } from "react";
import { View, type TextInput } from "react-native";

import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { Step } from "@/ui/screens/onboarding/components/step";

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    console.log("Submitting create account form");
  };

  return (
    <Step>
      <Step.Header>
        <Step.Title>Crie sua conta</Step.Title>
        <Step.Subtitle>Para poder visualizar seu progresso</Step.Subtitle>
      </Step.Header>

      <Step.Content>
        <View style={{ gap: 24 }}>
          <FormGroup label="Nome">
            <Input
              autoFocus
              placeholder="João Silva"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              // value={field.value}
              // onChangeText={field.onChange}
              // disabled={form.formState.isSubmitting}
            />
          </FormGroup>

          <FormGroup label="E-mail">
            <Input
              ref={emailInputRef}
              placeholder="joao.silva@example.com"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              // value={field.value}
              // onChangeText={field.onChange}
              // disabled={form.formState.isSubmitting}
            />
          </FormGroup>

          <FormGroup label="Senha">
            <Input
              ref={passwordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              // value={field.value}
              // onChangeText={field.onChange}
              // disabled={form.formState.isSubmitting}
            />
          </FormGroup>

          <FormGroup label="Confirmar Senha">
            <Input
              ref={confirmPasswordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              // value={field.value}
              // onChangeText={field.onChange}
              // disabled={form.formState.isSubmitting}
            />
          </FormGroup>
        </View>
      </Step.Content>

      <Step.Footer align="start">
        <Button
          onPress={handleSubmit}
          style={{ width: "100%" }}
          // isLoading={form.formState.isSubmitting}
        >
          Criar conta
        </Button>
      </Step.Footer>
    </Step>
  );
}
