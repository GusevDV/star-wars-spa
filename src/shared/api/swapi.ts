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
      transformResponse: (response: GetAllPeopleResponse) =>
        transformGetAllPeopleResponse(response),
    }),
    getPeopleById: builder.query<GetPeopleByIdResponse, string>({
      query: (id) => ({
        url: `/people/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export default swapi;
