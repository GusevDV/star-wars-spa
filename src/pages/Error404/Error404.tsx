import { Flex, Heading, Text } from '@chakra-ui/react';

const Error404 = () => {
  return (
    <>
      <Flex flexDirection="column" justifyContent="center" gap={6}>
        <Heading color="gray.700">Page not found</Heading>
        <Text>Check the site address</Text>
      </Flex>
    </>
  );
};

export default Error404;
