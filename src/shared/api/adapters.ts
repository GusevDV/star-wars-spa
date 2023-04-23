import { GetAllPeopleResponse } from './swapiTypes';

export const transformGetAllPeopleResponse = (response: GetAllPeopleResponse) => {
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
};
