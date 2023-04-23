import { Divider, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { People, swapi } from 'shared/api';
import PeopleProperty from './ui/PeopleProperty';
import { snakeCaseToPhrase } from './utils/utils';

const filters = ['eye_color', 'birth_year', 'gender', 'hair_color', 'height', 'mass', 'skin_color'];

export const Person = () => {
  const { id } = useParams();
  const { data, isLoading } = swapi.useGetPeopleByIdQuery(id as string);

  if (!data) {
    return null;
  }

  const filteredKeys = (Object.keys(data) as Array<keyof People>).filter((property) =>
    filters.includes(property)
  );

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <Heading>{data.name}</Heading>
        <Text as="sup">created: {data.created}</Text>
        <Text as="sup">edited: {data.edited}</Text>
      </Skeleton>
      <Divider />
      <Flex>
        {filteredKeys.map((key) => {
          const name = snakeCaseToPhrase(key);
          const value = data[key];
          return <PeopleProperty name={name} value={typeof value === 'string' ? value : ''} />;
        })}
      </Flex>
    </>
  );
};
export default Person;
