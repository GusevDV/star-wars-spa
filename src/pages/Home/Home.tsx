import { Box, Grid, LinkBox, LinkOverlay, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'widgets/Pagination';
import { swapi } from 'shared/api';

const Home = () => {
  const [page, setPage] = useState(1);
  const [getPeople, { data, isFetching }] = swapi.useLazyGetAllPeopleQuery();

  useEffect(() => {
    getPeople();
  }, []);

  const handlePageButtonClick = (newPage: number) => {
    setPage(newPage);
    getPeople({ page: newPage });
  };

  return (
    <>
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
              as={Box}
              key={person.id}
              boxShadow="md"
              h={40}
              bg="gray.50"
              borderRadius={10}
              textAlign="center"
              color="gray.900"
              p={2}
              transitionDuration="fast"
              transitionTimingFunction="ease-out"
              _hover={{
                textDecoration: 'none',
                transform: 'translateY(-0.3rem)',
                boxShadow: 'xl',
              }}
            >
              <LinkOverlay as={Link} to={'/'}>
                {person.name}
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
