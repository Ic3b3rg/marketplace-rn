import { baseApi } from "./api";

// Iniettare authApi nel baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Session", "Auth"],
    }),

    logout: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "logout",
        method: "DELETE",
        body: { email },
      }),
      invalidatesTags: ["Session", "Auth"],
    }),

    getSession: builder.query<any, void>({
      query: () => "auth/session",
      providesTags: ["Session"],
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useGetSessionQuery } =
  authApi;
