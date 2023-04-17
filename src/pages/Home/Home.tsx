import { Box, Button, Flex, Grid, LinkBox, LinkOverlay, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { swapi } from 'shared/api';

enum Navigation {
  Previous = 'previous',
  Next = 'next',
}

const Home = () => {
  const [getPeople, { data, isFetching }] = swapi.useLazyGetAllPeopleQuery();

  const [page, setPage] = useState(1);

  useEffect(() => {
    getPeople();
  }, []);

  const handlePageButtonClick = (navType: Navigation) => {
    const newPage = navType === Navigation.Next ? page + 1 : page - 1;
    getPeople({
      page: newPage,
    });
    setPage(newPage);
  };

  return (
    <>
      <Grid mt={10} templateColumns="repeat(5, 1fr)" gap={6}>
        {isFetching &&
          [...Array(10).keys()].map((key) => <Skeleton key={key} h={40} borderRadius={10} />)}
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
      <Flex mt={10} justifyContent="space-between">
        <Button
          isDisabled={page === 1 || isFetching}
          onClick={() => handlePageButtonClick(Navigation.Previous)}
        >
          Назад
        </Button>
        <Button
          isDisabled={!data?.nextPage || isFetching}
          onClick={() => handlePageButtonClick(Navigation.Next)}
        >
          Вперед
        </Button>
      </Flex>
    </>
  );
};

export default Home;
