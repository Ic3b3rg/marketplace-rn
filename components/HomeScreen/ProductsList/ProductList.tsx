import { useGetProductsQuery } from "@/api/products.api";
import ErrorView from "@/components/ErrorView";
import { H1, Body } from "@/components/ui/Text";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import CardProduct from "../CardProduct/CardProduct";
import Paginator from "@/components/Paginator";
import React from "react";
const LIMIT_PAGE = 10;
export default function ProductList() {
  const [page, setPage] = React.useState<number>(1);
  const { data, isFetching, isLoading, isError, refetch } = useGetProductsQuery(
    {
      limit: LIMIT_PAGE,
      page,
    },
  );

  const retry = () => {
    setPage(1);
    refetch();
  };
  if (isError) {
    return <ErrorView onRetry={retry} />;
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
      keyExtractor={(item, i) => `${i}`}
      renderItem={({ item }) => <CardProduct product={item} />}
      ListEmptyComponent={
        <Body style={styles.empty}>Nessun prodotto disponibile</Body>
      }
      ListFooterComponent={
        <Paginator
          currentPage={page}
          totalPage={data?.data.pagination.totalPages!}
          onChange={setPage}
        />
      }
    />
  );
}
const styles = StyleSheet.create({
  sectionTitle: { margin: 16 },
  empty: { margin: 16 },
});
