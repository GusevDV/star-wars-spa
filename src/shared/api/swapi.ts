import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { SWAPI_URL } from 'shared/config';
import { transformGetAllPeopleResponse } from './adapters';
import axiosBaseQuery from './axiosBaseQuery';
import {
  GetAllPeopleRequest,
  GetAllPeopleResponse,
  GetAllPeopleTransformedResponse,
  GetPeopleByIdResponse,
} from './swapiTypes';

const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: axiosBaseQuery({
    baseUrl: SWAPI_URL,
  }),
  tagTypes: ['People'],
  endpoints: (builder) => ({
    getAllPeople: builder.query<GetAllPeopleTransformedResponse, GetAllPeopleRequest>({
      query: (params) => ({
        url: '/people',
        method: 'GET',
        params: {
          ...(params?.search && { search: params.search }),
          ...(params?.page && { page: params.page }),
        },
      }),
      keepUnusedDataFor: 180,
      transformResponse: (response: GetAllPeopleResponse) =>
        transformGetAllPeopleResponse(response),
      providesTags: (result) =>
        result && result.results
          ? [...result.results.map(({ id }) => ({ type: 'People' as const, id })), 'People']
          : ['People'],
    }),
    getPeopleById: builder.query<GetPeopleByIdResponse, string>({
      query: (id) => ({
        url: `/people/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 180,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'People' as const, id: arg }, 'People'] : ['People'],
    }),
  }),
});

export default swapi;
