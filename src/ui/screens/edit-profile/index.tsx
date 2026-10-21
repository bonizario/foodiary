import { Controller } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { BiologicalSex } from "@/app/types/biological-sex";

import { AppHeader } from "@/ui/components/app-header";
import { Button } from "@/ui/components/button";
import { DateInput } from "@/ui/components/date-input";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";
import { RadioGroup } from "@/ui/components/radio-group";

import { formatDecimal } from "@/shared/functions/format-decimal";

import { styles } from "./styles";
import { useEditProfileController } from "./use-edit-profile-controller";

export function EditProfile() {
  const { account, bottom, form, handleSubmit, isDirty, isSubmitting, top } =
    useEditProfileController();

  if (!account) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Perfil" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: "https://github.com/bonizario.png" }} style={styles.avatar} />
          </View>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormGroup label="Nome" error={fieldState.error?.message}>
                  <Input
                    onChangeText={field.onChange}
                    placeholder="Mateus Silva"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="birthdate"
              render={({ field, fieldState }) => (
                <FormGroup label="Data de Nascimento" error={fieldState.error?.message}>
                  <DateInput
                    error={!!fieldState.error}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="height"
              render={({ field, fieldState }) => (
                <FormGroup label="Altura" error={fieldState.error?.message}>
                  <Input
                    formatter={formatDecimal}
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="175"
                    suffix="cm"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="weight"
              render={({ field, fieldState }) => (
                <FormGroup label="Peso" error={fieldState.error?.message}>
                  <Input
                    formatter={formatDecimal}
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="80"
                    suffix="kg"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="biologicalSex"
              render={({ field, fieldState }) => (
                <FormGroup label="Sexo" error={fieldState.error?.message}>
                  <RadioGroup
                    error={!!fieldState.error}
                    onChangeValue={field.onChange}
                    orientation="horizontal"
                    value={field.value}
                  >
                    <RadioGroup.Item value={BiologicalSex.MALE}>
                      <RadioGroup.Icon>🧔‍♂️</RadioGroup.Icon>
                      <RadioGroup.Label>Masculino</RadioGroup.Label>
                    </RadioGroup.Item>
                    <RadioGroup.Item value={BiologicalSex.FEMALE}>
                      <RadioGroup.Icon>👩‍🦰</RadioGroup.Icon>
                      <RadioGroup.Label>Feminino</RadioGroup.Label>
                    </RadioGroup.Item>
                  </RadioGroup>
                </FormGroup>
              )}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottom }]}>
          <Button
            onPress={() => handleSubmit()}
            isLoading={isSubmitting}
            disabled={isSubmitting || !isDirty}
          >
            Salvar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
