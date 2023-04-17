import { Box } from '@chakra-ui/react';
import { swapi } from 'shared/api';

const Home = () => {
  const { data } = swapi.useGetAllPeopleQuery();

  console.log(data);

  return <Box>Welcome</Box>;
};

export default Home;
