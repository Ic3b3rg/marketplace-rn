import { ProductListItem } from "@/types/product";
import { baseApi } from "./api";
import { BaseResponse, PaginatorResponse } from "@/types/api";

// Iniettare productsApi nel baseApi
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      BaseResponse<PaginatorResponse<ProductListItem>>,
      Record<"page" | "limit", number>
    >({
      query: ({ page = 1, limit = 10 }) =>
        `products?page=${page}&limit=${limit}`,
      providesTags: (res, err, req) =>
        res ? [{ type: "pageProdotti", id: req.page }] : [],
    }),

    getProduct: builder.query<any, number>({
      query: (idProduct) => `products/${idProduct}`,
      providesTags: (res, err, idProduct) =>
        res ? [{ type: "dettaglioProdotto", id: idProduct }] : [],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
