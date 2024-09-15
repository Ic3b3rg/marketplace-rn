import ErrorView from "@/components/ErrorView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProductDetailScreen() {
  const { idProduct } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ErrorView />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
