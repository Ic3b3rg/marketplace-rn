import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { baseApi } from "./api";
import { UserSession } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      async queryFn(
        { email, password },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        const loginResult = await fetchWithBQ({
          url: "auth",
          method: "POST",
          body: { email, password },
        });
        if (loginResult.error) {
          return { error: loginResult.error as FetchBaseQueryError };
        }
        const sessionResult = await fetchWithBQ("auth/session");
        return sessionResult.data
          ? { data: sessionResult.data }
          : { error: sessionResult.error as FetchBaseQueryError };
      },
    }),

    logout: builder.mutation<Omit<UserSession, "data">, void>({
      query: () => ({
        url: "auth",
        method: "DELETE",
      }),
      invalidatesTags: ["Session", "Auth"],
    }),

    getSession: builder.query<UserSession, void>({
      query: () => "auth/session",
      providesTags: ["Session"],
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useGetSessionQuery } =
  authApi;
