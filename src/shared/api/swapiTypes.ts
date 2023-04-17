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
  page?: string;
};

export type GetAllPeopleRequest = (SearchRequest & PaginatedRequest) | void;

export type GetAllPeopleResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<T>;
};

export type GetAllPeopleTransformedResponse = GetAllPeopleResponse<People & { id: number }> & {
  nextPage: number;
};
