import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { useAccount } from "@/app/hooks/queries/use-account";

import { AppHeader } from "@/ui/components/app-header";
import { Button } from "@/ui/components/button";
import { FormGroup } from "@/ui/components/form-group";
import { Input } from "@/ui/components/input";

import { styles } from "./styles";
import { useEditGoalsController } from "./use-edit-goals-controller";

export function EditGoals() {
  const { account } = useAccount();

  const { top, bottom, form, handleSubmit, isDirty, isSubmitting } = useEditGoalsController();

  if (!account) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Editar Metas" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <Controller
              control={form.control}
              name="calories"
              render={({ field, fieldState }) => (
                <FormGroup label="Calorias" error={fieldState.error?.message}>
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="2000"
                    suffix="kcal"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="carbohydrates"
              render={({ field, fieldState }) => (
                <FormGroup label="Carboidratos" error={fieldState.error?.message}>
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="200"
                    suffix="g"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="proteins"
              render={({ field, fieldState }) => (
                <FormGroup label="Proteínas" error={fieldState.error?.message}>
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="175"
                    suffix="g"
                    value={field.value}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="fats"
              render={({ field, fieldState }) => (
                <FormGroup label="Gorduras" error={fieldState.error?.message}>
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    placeholder="56"
                    suffix="g"
                    value={field.value}
                  />
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
