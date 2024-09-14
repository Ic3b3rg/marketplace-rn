import { useGetProductsQuery } from "@/api/products.api";
import { H1, Body } from "@/components/ui/Text";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

export default function ProductList() {
  const { data, isFetching, isLoading, refetch } = useGetProductsQuery({
    limit: 20,
    page: 1,
  });
  console.log(data);
  return (
    <FlatList
      data={data}
      ListHeaderComponent={
        <H1 style={styles.sectionTitle}>Elenco dei nostri prodotti</H1>
      }
      refreshControl={
        <RefreshControl
          refreshing={isFetching || isLoading}
          onRefresh={refetch}
        />
      }
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item, index }) => <Body>coa</Body>}
      ListEmptyComponent={
        <Body style={styles.empty}>Nessun prodotto disponibile</Body>
      }
    />
  );
}
const styles = StyleSheet.create({
  sectionTitle: { margin: 16 },
  empty: { margin: 16 },
});
