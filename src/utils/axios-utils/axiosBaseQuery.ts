import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const axiosBaseQuery =
  ({
    baseUrl = "",
    baseHeaders = {},
  }: {
    baseUrl: string;
    baseHeaders?: AxiosRequestConfig["headers"];
  }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", body, headers = {} }) => {
    try {
      // console.log("call >>> ", (baseUrl + url))
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        headers: { ...baseHeaders, ...headers },
      });
      // console.log("result ---->", result);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      // console.log("error ", err);
      return {
        error: { data: err.response?.data },
      };
    }
  };
