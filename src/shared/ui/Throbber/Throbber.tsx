import { Box, Spinner } from '@chakra-ui/react';

const Throbber = () => {
  return (
    <Box display="inline-flex" position="relative">
      <Spinner label="Loading..." />
    </Box>
  );
};

export default Throbber;
