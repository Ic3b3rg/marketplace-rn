import { SessionProvider } from "@/context/auth";
import { store } from "@/store/store";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useFonts } from "expo-font";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
};

export default RootLayout;
