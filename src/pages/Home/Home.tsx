import { Box, Grid, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { swapi } from 'shared/api';

const Home = () => {
  const { data } = swapi.useGetAllPeopleQuery();

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {data?.results.map((person) => (
        <LinkBox
          as={Box}
          key={person.name}
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
  );
};

export default Home;
