import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Button } from "@/ui/components/button";
import { CreateMealOptions } from "@/ui/components/create-meal-options";
import { useSafeArea } from "@/ui/hooks/use-safe-area";
import { theme } from "@/ui/styles/theme";

import { styles } from "./styles";

export function Fab() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeArea();

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <>
      <View style={[styles.container, { bottom: bottom }]}>
        <Button size="icon" onPress={handleOpenBottomSheet}>
          <PlusIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={[styles.content, { paddingBottom: bottom }]}>
            <AppText style={styles.title} fontSize="lg" weight="semibold">
              Cadastre sua refeição
            </AppText>

            <CreateMealOptions onCreate={handleCloseBottomSheet} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
