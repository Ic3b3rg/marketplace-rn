import { baseApi } from "./api";

// Iniettare productsApi nel baseApi
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, Record<"page" | "limit", number>>({
      query: ({ page = 1, limit = 10 }) =>
        `products?page=${page}&limit=${limit}`,
    }),

    getProduct: builder.query<any, number>({
      query: (idProduct) => `products/${idProduct}`,
      providesTags: (res, err, idProduct) =>
        res ? [{ type: "dettaglioProdotto", id: idProduct }] : [],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
