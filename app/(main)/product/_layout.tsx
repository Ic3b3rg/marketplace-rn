import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import "react-native-reanimated";

import { useSession } from "@/context/auth";

export default function ProductLayout() {
  const { session } = useSession();
  const { idProduct } = useLocalSearchParams<{ idProduct: string }>();

  if (!session) {
    return (
      <Redirect
        href={{
          pathname: "/login",
          params: { idProduct },
        }}
      />
    );
  }
  return (
    <Stack>
      <Stack.Screen
        name="[idProduct]"
        options={{ headerShown: true, title: "Dettaglio Prodotto" }}
      />
    </Stack>
  );
}
