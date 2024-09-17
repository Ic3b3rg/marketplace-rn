import { Stack } from "expo-router";

export default function Root() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerShown: true, title: "Accedi" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
