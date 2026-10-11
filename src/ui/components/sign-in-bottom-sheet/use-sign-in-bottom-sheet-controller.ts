import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useRef, useState, type Ref } from "react";
import { useForm } from "react-hook-form";
import { Alert, type TextInput } from "react-native";

import { useAuth } from "@/app/contexts/auth-context/use-auth";

import { useSafeArea } from "@/ui/hooks/use-safe-area";

import { signInSchema } from "./schema";

export type SignInBottomSheetRef = Ref<{ open: () => void }>;

export function useSignInBottomSheetController(ref: SignInBottomSheetRef) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { bottom } = useSafeArea();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitDisabled(true);
      await signIn(data);
    } catch {
      setIsSubmitDisabled(false);
      // TODO: improve error handling UX
      Alert.alert("As credenciais informadas estão incorretas");
    }
  });

  useImperativeHandle(ref, () => ({ open: () => bottomSheetModalRef.current?.present() }), []);

  return {
    bottom,
    bottomSheetModalRef,
    form,
    handleSubmit,
    isSubmitDisabled,
    passwordInputRef,
  };
}
