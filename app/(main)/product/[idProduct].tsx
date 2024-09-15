import { useGetProductQuery } from "@/api/products.api";
import ErrorView from "@/components/ErrorView";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { ProductDetail } from "@/types/product";
import { Body, H1 } from "@/components/ui/Text";
import SafeArea from "@/components/ui/SafeArea";
import Button from "@/components/ui/Button";
export default function ProductDetailScreen() {
  const { idProduct } = useLocalSearchParams<{ idProduct: string }>();
  const { isSuccess, isError, data, isLoading, error } =
    useGetProductQuery(idProduct);
  if (isError && "status" in error && error.status === 403) {
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
    <SafeArea>
      <View style={styles.container}>
        {isError && <ErrorView />}
        {isLoading && <ActivityIndicator />}
        {isSuccess && <ProductDetailView product={data.data} />}
      </View>
    </SafeArea>
  );
}
interface ProductDetailViewProps {
  product: ProductDetail;
}
function ProductDetailView({ product }: ProductDetailViewProps) {
  const stars = new Array(product.rating).fill(0);
  return (
    <>
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", height: 150 }}
      />
      <View style={styles.textContainer}>
        <H1>{product.title}</H1>
        <Body>{product.description}</Body>
      </View>
      <View style={styles.stars}>
        <Body>Rating:</Body>
        {stars.map((_, i) => (
          <Body key={i}>⭐</Body>
        ))}
      </View>
      <Button label={`Compralo a soli ${product.price}€`} />
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", gap: 16 },
  textContainer: {
    paddingHorizontal: 8,
    alignContent: "center",
    gap: 16,
  },
  stars: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#bebebe",
    padding: 8,
    borderRadius: 8,
  },
});
