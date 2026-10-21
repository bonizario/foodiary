import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useUpdateGoals } from "@/app/hooks/mutations/use-update-goals";
import { useAccount } from "@/app/hooks/queries/use-account";

import { useSafeArea } from "@/ui/hooks/use-safe-area";

import { editGoalsSchema, type EditGoalsSchemaInput, type EditGoalsSchemaOutput } from "./schema";

export function useEditGoalsController() {
  const { top, bottom } = useSafeArea();

  const { goBack } = useNavigation();

  const { account } = useAccount();

  const { isUpdatingGoals, updateGoals } = useUpdateGoals();

  const form = useForm<EditGoalsSchemaInput, unknown, EditGoalsSchemaOutput>({
    resolver: zodResolver(editGoalsSchema),
    defaultValues: {
      calories: String(account?.goal.calories ?? ""),
      carbohydrates: String(account?.goal.carbohydrates ?? ""),
      proteins: String(account?.goal.proteins ?? ""),
      fats: String(account?.goal.fats ?? ""),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateGoals({
        calories: Number(data.calories),
        carbohydrates: Number(data.carbohydrates),
        proteins: Number(data.proteins),
        fats: Number(data.fats),
      });

      Alert.alert("Sucesso!", "Metas atualizadas com sucesso", [{ onPress: () => goBack() }]);
    } catch (error) {
      console.error("Failed to update goals:", error);
      Alert.alert("Erro", "Não foi possível atualizar as metas");
    }
  });

  return {
    top,
    bottom,
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting || isUpdatingGoals,
    isDirty: form.formState.isDirty,
  };
}
