import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@utils/constants";
import { axiosBaseQuery } from "@utils/axios-utils";
import {
  ReadProfileResponse,
  ReadProfilePayload,
  UpdateProfileResponse,
  UpdateProfilePayload,
} from "./interface";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/` }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfilePayload
    >({
      query: ({ id, name, job }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: { name, job },
      }),
    }),
    getProfile: builder.query<ReadProfileResponse, ReadProfilePayload>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useGetProfileQuery } = profileApi;
