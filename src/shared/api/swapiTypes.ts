export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unkwnon = 'unknown',
  NA = 'n/a',
}

export type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: string;
  edited: string;
  url: string;
};

export type SearchRequest = {
  search?: string;
};

export type PaginatedRequest = {
  page?: number;
};

export type GetAllPeopleRequest = (SearchRequest & PaginatedRequest) | void;

export type GetAllPeopleResponse<T = People> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type PeopleWithId = People & { id: number };

export type GetAllPeopleTransformedResponse = GetAllPeopleResponse<PeopleWithId> & {
  nextPage: number | null;
  prevPage: number | null;
};

export type GetPeopleByIdResponse = People;
