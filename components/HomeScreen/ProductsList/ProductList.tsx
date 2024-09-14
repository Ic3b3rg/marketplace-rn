import { useGetProductsQuery } from "@/api/products.api";
import ErrorView from "@/components/ErrorView";
import { H1, Body } from "@/components/ui/Text";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import CardProduct from "../CardProduct/CardProduct";

export default function ProductList() {
  const { data, isFetching, isLoading, isError, refetch } = useGetProductsQuery(
    {
      limit: 10,
      page: 1,
    },
  );
  if (isError) {
    return <ErrorView onRetry={refetch} />;
  }
  return (
    <FlatList
      data={data?.data.values}
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
      renderItem={({ item, index }) => <CardProduct product={item} />}
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
