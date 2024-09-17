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
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
      <View style={styles.content}>
        <Body style={styles.title}>{product.title}</Body>
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
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    fontWeight: 700,
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
});
