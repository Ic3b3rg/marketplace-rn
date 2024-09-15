import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import { Body } from "@/components/ui/Text";
import { ProductListItem } from "@/types/product";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
interface Props {
  product: ProductListItem;
}
export default function CardProduct({ product }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={{ width: 80, height: 80 }}
      />
      <View style={styles.content}>
        <Body>{product.title}</Body>
        <Link
          href={{
            pathname: "/product/[idProduct]",
            params: { idProduct: product.id },
          }}
          asChild
        >
          <LinkButton accessibilityRole="button" label="Vai al prodotto" />
        </Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  content: {
    alignItems: "center",
    gap: 8,
  },
});
