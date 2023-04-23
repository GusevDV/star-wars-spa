import { FlexProps } from '@chakra-ui/layout/dist/flex';
import { Button, Flex, usePrevious } from '@chakra-ui/react';
import { getPagesCount } from './utils';

enum Navigation {
  Previous = 'previous',
  Next = 'next',
}

export type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
} & FlexProps;

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  isLoading,
  onPageChange,
  ...rest
}: PaginationProps) => {
  const pagesCount = getPagesCount(totalCount, pageSize);
  const previousPagesCount = usePrevious(pagesCount);

  const handlePageButtonClick = (navType: Navigation) => {
    const totalPages = previousPagesCount ? previousPagesCount : pagesCount;
    if (navType === Navigation.Next && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (navType === Navigation.Previous && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <Flex justifyContent="space-between" {...rest}>
      <Button
        isDisabled={currentPage === 1 || isLoading}
        colorScheme="purple"
        onClick={() => handlePageButtonClick(Navigation.Previous)}
      >
        Back
      </Button>
      <Button
        isDisabled={
          totalCount < (previousPagesCount ?? pagesCount) ||
          (previousPagesCount ?? pagesCount) === currentPage ||
          isLoading
        }
        colorScheme="purple"
        onClick={() => handlePageButtonClick(Navigation.Next)}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
