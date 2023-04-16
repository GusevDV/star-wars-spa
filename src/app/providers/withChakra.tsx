import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';

const withChakra = (Component: FC) => () =>
  (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );

export default withChakra;
