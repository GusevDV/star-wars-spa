import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { SWAPI_URL } from 'shared/config';
import axiosBaseQuery from './axiosBaseQuery';
import {
  GetAllPeopleRequest,
  GetAllPeopleResponse,
  GetAllPeopleTransformedResponse,
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
      transformResponse: (response: GetAllPeopleResponse) => {
        const { next, previous } = response;

        const nextUrl = next ? new URL(next) : null;
        const nextPage = nextUrl ? Number(nextUrl.searchParams.get('page')) : null;

        const prevUrl = previous ? new URL(previous) : null;
        const prevPage = prevUrl ? Number(prevUrl.searchParams.get('page')) : null;

        return {
          ...response,
          nextPage,
          prevPage,
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
