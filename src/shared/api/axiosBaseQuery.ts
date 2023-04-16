import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface AxiosBaseQuery {
  baseUrl?: string;
}

export type AxiosBaseQueryError = {
  status: number | undefined;
  data: unknown | undefined;
};

const axiosBaseQuery =
  (
    { baseUrl }: AxiosBaseQuery = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      headers?: AxiosRequestConfig['headers'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, headers, params }, api) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        ...(headers && { headers }),
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default axiosBaseQuery;
