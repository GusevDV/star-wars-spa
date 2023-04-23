import { transformGetAllPeopleResponse } from '../adapters';
import { GetAllPeopleResponse, GetAllPeopleTransformedResponse } from '../swapiTypes';

describe('transformGetAllPeopleResponse', () => {
  const sampleResponse = {
    count: 2,
    next: 'https://swapi.dev/api/people/?page=3',
    previous: 'https://swapi.dev/api/people/?page=1',
    results: [
      {
        name: 'Luke Skywalker',
        // ...other properties
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        // ...other properties
        url: 'https://swapi.dev/api/people/2/',
      },
    ],
  };

  it('transforms the response as expected', () => {
    const expectedResult = {
      ...sampleResponse,
      nextPage: 3,
      prevPage: 1,
      results: [
        {
          ...sampleResponse.results[0],
          id: 1,
        },
        {
          ...sampleResponse.results[1],
          id: 2,
        },
      ],
    };

    const transformedResponse = transformGetAllPeopleResponse(
      sampleResponse as GetAllPeopleResponse
    );
    expect(transformedResponse).toEqual(expectedResult);
  });

  it('handles null values for next and previous', () => {
    const responseWithNulls = {
      ...sampleResponse,
      next: null,
      previous: null,
    };

    const expectedResult = {
      ...responseWithNulls,
      nextPage: null,
      prevPage: null,
      results: [
        {
          ...sampleResponse.results[0],
          id: 1,
        },
        {
          ...sampleResponse.results[1],
          id: 2,
        },
      ],
    };

    const transformedResponse = transformGetAllPeopleResponse(
      responseWithNulls as GetAllPeopleTransformedResponse
    );
    expect(transformedResponse).toEqual(expectedResult);
  });
});
