import { Avatar, Box, Card, Divider, Flex, Grid, Heading, Skeleton, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { People, swapi } from 'shared/api';
import PeopleProperty from './ui/PeopleProperty';
import { snakeCaseToPhrase } from './utils/utils';

const filters = ['eye_color', 'birth_year', 'gender', 'hair_color', 'height', 'mass', 'skin_color'];

export const Person = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = swapi.useGetPeopleByIdQuery(id as string);

  const filteredKeys = useMemo(
    () =>
      (Object.keys(data ?? []) as Array<keyof People>).filter((property) =>
        filters.includes(property)
      ),
    [data]
  );

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <>
      <Grid gridTemplateColumns={['1fr', '1fr', '2fr 4fr']} gap={10}>
        <Skeleton isLoaded={!isFetching}>
          <Card p={10} bg="gray.50">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              py={[2, 4]}
              gap={4}
              flexWrap="wrap"
            >
              <Avatar size={['xl', '2xl']} />
              <Skeleton isLoaded={!isFetching}>
                <Heading as="h1" size="lg">
                  {data ? data.name : ''}
                </Heading>
              </Skeleton>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {data && <>created: {moment(data.created).format('MMM Do YYYY, h:mm:ss a')}</>}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {data && <>edited: {moment(data.edited).format('MMM Do YYYY, h:mm:ss a')}</>}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Skeleton>
        <Box>
          <Text as="h2" fontSize="lg">
            Personal information
          </Text>
          <Divider mt={2} />
          <Grid
            mt={4}
            templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
            gap={6}
          >
            {isFetching && filters.map((key) => <Skeleton h={'80px'} key={key} />)}
            {data &&
              filteredKeys.map((key) => {
                const name = snakeCaseToPhrase(key);
                const value = data[key];
                return (
                  <PeopleProperty
                    key={key}
                    name={name}
                    value={typeof value === 'string' ? value : ''}
                  />
                );
              })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
export default Person;
