import { Flex, Heading, Text } from '@chakra-ui/react';

const Error = () => {
  return (
    <>
      <Flex flexDirection="column" justifyContent="center" gap={6}>
        <Heading color={'gray.700'}>Something went wrong</Heading>
        <Text>Try to reload the page</Text>
      </Flex>
    </>
  );
};

export default Error;
