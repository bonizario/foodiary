import { useCallback, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@/app/contexts/auth-context/use-auth";
import { useAccount } from "@/app/hooks/queries/use-account";

import { AppText } from "@/ui/components/app-text";
import { Header } from "@/ui/screens/home/components/header";
import { styles } from "@/ui/screens/home/styles";
import { DietPlanModal } from "@/ui/screens/onboarding/components/diet-plan-modal";
import { theme } from "@/ui/styles/theme";

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: account, refetch } = useAccount();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DietPlanModal />

      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={<Header />}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.lime[900]}
            colors={[theme.colors.lime[700]]}
          />
        }
        renderItem={() => <AppText>Item</AppText>}
      />
    </View>
  );
}
