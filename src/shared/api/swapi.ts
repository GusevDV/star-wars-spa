import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { SWAPI_URL } from 'shared/config';
import axiosBaseQuery from './axiosBaseQuery';
import {
  GetAllPeopleRequest,
  GetAllPeopleResponse,
  GetAllPeopleTransformedResponse,
  People,
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
      transformResponse: (response: GetAllPeopleResponse<People>) => {
        const nextUrl = new URL(response.next);
        const nextPage = Number(nextUrl.searchParams.get('page'));
        return {
          ...response,
          nextPage,
          results: response.results.map((person) => ({
            ...person,
            id: Number(person.url.replace(/\D+/g, '')),
          })),
        };
      },
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
