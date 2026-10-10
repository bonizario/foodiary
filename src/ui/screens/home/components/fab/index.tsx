import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { PlusIcon } from "lucide-react-native";
import { useRef } from "react";
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

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <View style={[styles.container, { bottom: bottom }]}>
        <Button size="icon" onPress={handleOpenBottomSheet}>
          <PlusIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} style={styles.bottomSheet}>
          <BottomSheetView style={[styles.content, { paddingBottom: bottom }]}>
            <AppText style={styles.title} fontSize="lg" weight="semibold">
              Cadastre sua refeição
            </AppText>

            <CreateMealOptions />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
