import { ProductDetail, ProductListItem } from "@/types/product";
import { baseApi } from "./api";
import {
  BaseResponse,
  BaseResponseWithMessage,
  PaginatorResponse,
} from "@/types/api";

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

    getProduct: builder.query<BaseResponseWithMessage<ProductDetail>, string>({
      query: (idProduct) => `products/${idProduct}`,
      providesTags: (res, err, idProduct) =>
        res ? [{ type: "dettaglioProdotto", id: idProduct }] : [],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
