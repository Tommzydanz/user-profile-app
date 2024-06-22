import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@utils/constants";
import { axiosBaseQuery } from "@utils/axios-utils";
import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "./interface";
import { IResponse } from "../interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/` }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<IResponse, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
