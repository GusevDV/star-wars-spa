import { Box, Divider, Flex, Grid, Heading, Skeleton, Text } from '@chakra-ui/react';
import moment from 'moment';
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
        <Flex justifyContent="space-between" alignItems="center" py={[4, 10]} flexWrap="wrap">
          <Heading pr={6}>{data.name}</Heading>
          <Box>
            <Text color="gray.400" fontSize="sm">
              created: {moment(data.created).format('MMM Do YYYY, h:mm:ss a')}
            </Text>
            <Text color="gray.400" fontSize="sm">
              edited: {moment(data.edited).format('MMM Do YYYY, h:mm:ss a')}
            </Text>
          </Box>
        </Flex>
      </Skeleton>
      <Divider />
      <Grid
        mt={10}
        templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={6}
      >
        {filteredKeys.map((key) => {
          const name = snakeCaseToPhrase(key);
          const value = data[key];
          return <PeopleProperty name={name} value={typeof value === 'string' ? value : ''} />;
        })}
      </Grid>
    </>
  );
};
export default Person;
