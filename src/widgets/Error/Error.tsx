import { Button, Flex, Heading, Text } from '@chakra-ui/react';

export enum ErrorCodes {
  Canceled = 'ECONNABORTED',
  Timeout = 'ETIMEDOUT',
  Network = 'ERR_NETWORK',
  NotFound = 'NotFound',
}

export type ErrorProps = {
  code?: ErrorCodes | string; // string for axios compatibility
  onReload?: () => void;
};

const Error = ({ code, onReload }: ErrorProps) => {
  let title;
  let message;
  let isReloadPossible = false;
  switch (code) {
    case ErrorCodes.Network:
      title = 'Network error';
      message = 'Please check your connection and try again.';
      isReloadPossible = true;
      break;
    case ErrorCodes.Timeout:
    case ErrorCodes.Canceled:
      title = 'Timeout';
      message = 'Please try again.';
      isReloadPossible = true;
      break;
    case ErrorCodes.NotFound:
      title = 'Page not found';
      message = 'Check the site address.';
      break;
    default:
      title = 'Something went wrong';
      message = 'Try to reload the page.';
      break;
  }

  return (
    <Flex flexDirection="column" justifyContent="center" gap={6}>
      <Heading size="lg" color={'gray.700'}>
        {title}
      </Heading>
      <Text>{message}</Text>
      {onReload && isReloadPossible && (
        <Button
          colorScheme="purple"
          variant="outline"
          w={['auto', 'auto', 'min-content']}
          onClick={() => onReload()}
        >
          Reload
        </Button>
      )}
    </Flex>
  );
};

export default Error;
