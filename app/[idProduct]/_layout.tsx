import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useSession } from "@/context/auth";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session } = useSession();
  const { idProduct } = useLocalSearchParams<{ idProduct: string }>();

  if (!session) {
    return <Redirect href={`/login?idProduct=${idProduct}`} />;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Dettaglio Prodotto" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
