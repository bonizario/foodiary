import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useUpdateProfile } from "@/app/hooks/mutations/use-update-profile";
import { useAccount } from "@/app/hooks/queries/use-account";
import { BiologicalSex } from "@/app/types/biological-sex";

import { useSafeArea } from "@/ui/hooks/use-safe-area";

import {
  editProfileSchema,
  type EditProfileSchemaInput,
  type EditProfileSchemaOutput,
} from "./schema";

export function useEditProfileController() {
  const { top, bottom } = useSafeArea();

  const { goBack } = useNavigation();

  const { account } = useAccount();

  const { isUpdatingProfile, updateProfile } = useUpdateProfile();

  const [today] = useState(() => new Date());

  const form = useForm<EditProfileSchemaInput, unknown, EditProfileSchemaOutput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: account?.profile.name ?? "",
      birthdate: account?.profile.birthdate ?? today,
      height: String(account?.profile.height ?? ""),
      weight: String(account?.profile.weight ?? ""),
      biologicalSex: account?.profile.biologicalSex ?? BiologicalSex.MALE,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateProfile({
        name: data.name,
        birthdate: data.birthdate,
        height: data.height,
        weight: data.weight,
        biologicalSex: data.biologicalSex,
      });

      Alert.alert("Sucesso!", "Perfil atualizado com sucesso", [{ onPress: () => goBack() }]);
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil");
    }
  });

  return {
    account,
    bottom,
    form,
    handleSubmit,
    isDirty: form.formState.isDirty,
    isSubmitting: form.formState.isSubmitting || isUpdatingProfile,
    top,
  };
}
