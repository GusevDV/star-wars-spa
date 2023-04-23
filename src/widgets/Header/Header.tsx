import { Box, Container, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box w="100%" as="header" boxShadow={'sm'} py={[2, 4]}>
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" color="purple.600">
          <Link to={'/'}>StarWars SPA</Link>
        </Heading>
      </Container>
    </Box>
  );
};

export default Header;
