import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useRef, type Ref } from "react";
import { useForm } from "react-hook-form";
import { Alert, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { SignInBottomSheetRef } from "@/ui/components/sign-in-bottom-sheet";
import { signInSchema } from "@/ui/components/sign-in-bottom-sheet/schema";

export function useSignInBottomSheetController(ref: Ref<SignInBottomSheetRef>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    Alert.alert("Submit button pressed", JSON.stringify(data));
  });

  useImperativeHandle(
    ref,
    () => ({ open: () => bottomSheetModalRef.current?.present() }),
    [],
  );

  return {
    bottom,
    bottomSheetModalRef,
    form,
    handleSubmit,
    passwordInputRef,
  };
}
