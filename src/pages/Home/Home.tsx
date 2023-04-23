import { Avatar, Card, Grid, LinkBox, LinkOverlay, Skeleton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'widgets/Pagination';
import Search from 'widgets/Search';
import { swapi } from 'shared/api';
import { routes } from 'shared/config';

const Home = () => {
  const [page, setPage] = useState(1);
  const [getPeople, { data, isFetching }] = swapi.useLazyGetAllPeopleQuery();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const handlePageButtonClick = (page: number) => {
    setPage(page);
    getPeople({ page });
  };

  const handleSearchChange = (search: string) => {
    getPeople({ search: search });
    setPage(1);
  };

  return (
    <>
      <Search onChange={handleSearchChange} />
      <Grid
        mt={10}
        templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={6}
      >
        {isFetching && [...Array(10)].map((_, i) => <Skeleton key={i} h={40} borderRadius={10} />)}
        {data &&
          !isFetching &&
          data?.results.map((person) => (
            <LinkBox
              as={Card}
              display="flex"
              justifyContent="center"
              key={person.id}
              minH={40}
              bg="gray.50"
              textAlign="center"
              p={2}
              transitionDuration="fast"
              transitionTimingFunction="ease-out"
              _hover={{
                textDecoration: 'none',
                transform: 'translateY(-0.3rem)',
                boxShadow: 'xl',
              }}
            >
              <LinkOverlay as={Link} to={routes.person.replace(':id', String(person.id))}>
                <Avatar size="lg" />
                <Text fontSize="xl" color="purple.900" mt={4}>
                  {person.name}
                </Text>
              </LinkOverlay>
            </LinkBox>
          ))}
      </Grid>
      <Pagination
        currentPage={page}
        totalCount={data ? data.count : 0}
        pageSize={data ? data.results.length : 0}
        isLoading={isFetching}
        onPageChange={handlePageButtonClick}
        mt={10}
      />
    </>
  );
};

export default Home;
