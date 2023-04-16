import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { SWAPI_PREFIX } from 'shared/config';
import axiosBaseQuery from './axiosBaseQuery';

const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: axiosBaseQuery({
    baseUrl: SWAPI_PREFIX,
  }),
  endpoints: (builder) => ({
    getPeople: builder.query<void, void>({
      query: () => ({
        url: '/people',
        method: 'GET',
      }),
    }),
  }),
});

export default swapi;
