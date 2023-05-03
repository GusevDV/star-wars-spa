import { FlexProps } from '@chakra-ui/layout/dist/flex';
import { Button, Flex } from '@chakra-ui/react';

enum Navigation {
  Previous = 'previous',
  Next = 'next',
}

export type PaginationProps = {
  isPreviousExists: boolean;
  isNextExists: boolean;
  currentPage: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
} & FlexProps;

const pageStep = 1;

const Pagination = ({
  isPreviousExists,
  isNextExists,
  currentPage,
  isLoading,
  onPageChange,
  ...rest
}: PaginationProps) => {
  const handlePageButtonClick = (navType: Navigation) => {
    if (navType === Navigation.Next && isNextExists) {
      onPageChange(currentPage + pageStep);
    } else if (navType === Navigation.Previous && isPreviousExists) {
      onPageChange(currentPage - pageStep);
    }
  };

  return (
    <Flex justifyContent="space-between" {...rest}>
      <Button
        isDisabled={!isPreviousExists || isLoading}
        colorScheme="purple"
        onClick={() => handlePageButtonClick(Navigation.Previous)}
      >
        Back
      </Button>
      <Button
        isDisabled={isLoading || !isNextExists}
        colorScheme="purple"
        onClick={() => handlePageButtonClick(Navigation.Next)}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
