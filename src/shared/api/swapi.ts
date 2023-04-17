import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { SWAPI_URL } from 'shared/config';
import axiosBaseQuery from './axiosBaseQuery';
import { GetAllPeopleRequest, GetAllPeopleResponse } from './swapiTypes';

const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: axiosBaseQuery({
    baseUrl: SWAPI_URL,
  }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<GetAllPeopleResponse, GetAllPeopleRequest>({
      query: (params) => ({
        url: '/people',
        method: 'GET',
        params: {
          ...(params?.search && { search: params.search }),
          ...(params?.page && { page: params.page }),
        },
      }),
    }),
    getPeopleById: builder.query<void, void>({
      query: (id) => ({
        url: `/people/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export default swapi;
