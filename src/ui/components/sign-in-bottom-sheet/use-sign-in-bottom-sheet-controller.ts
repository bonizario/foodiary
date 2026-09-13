import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useImperativeHandle, useRef, type Ref } from "react";
import { Alert, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { SignInBottomSheetRef } from "@/ui/components/sign-in-bottom-sheet";

export function useSignInBottomSheetController(ref: Ref<SignInBottomSheetRef>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    Alert.alert("Submit button pressed");
  };

  useImperativeHandle(
    ref,
    () => ({ open: () => bottomSheetModalRef.current?.present() }),
    [],
  );

  return {
    bottom,
    bottomSheetModalRef,
    handleSubmit,
    passwordInputRef,
  };
}
