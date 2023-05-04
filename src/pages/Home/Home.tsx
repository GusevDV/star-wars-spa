import { Grid, Skeleton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Error from 'widgets/Error';
import Pagination from 'widgets/Pagination';
import Search from 'widgets/Search';
import { swapi } from 'shared/api';
import PersonCard from './ui/PersonCard';

const firstPage = 1;
const skeletonCount = 10;

const Home = () => {
  const [page, setPage] = useState(firstPage);
  const [search, setSearch] = useState('');
  const [getPeople, { data, isFetching, isError, error }] = swapi.useLazyGetAllPeopleQuery();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const handlePageButtonClick = (page: number) => {
    setPage(page);
    getPeople({ page });
  };

  const handleSearchChange = (searchValue: string) => {
    if (searchValue) {
      getPeople({ search: searchValue });
    } else {
      getPeople({ page });
    }
    setSearch(searchValue);
    setPage(firstPage);
  };

  if (isError && error) {
    return (
      <Error
        code={'code' in error ? error.code : undefined}
        onReload={() => getPeople({ page, ...(search && { search }) })}
      />
    );
  }

  const isShowCards = data && data.results.length > 0 && !isFetching;
  const isShowNothingFound = data && data.results.length === 0 && !isFetching;

  return (
    <>
      <Search onChange={handleSearchChange} />
      <Grid
        mt={10}
        templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={6}
      >
        {isFetching &&
          [...Array(skeletonCount)].map((_, i) => (
            <Skeleton data-testid="skeleton" key={i} h={40} borderRadius={10} />
          ))}
        {isShowNothingFound && <Text>Nothing found</Text>}
        {isShowCards &&
          data.results.map(({ id, name }) => (
            <PersonCard key={id} name={name} id={id}></PersonCard>
          ))}
      </Grid>
      <Pagination
        isPreviousExists={!!data?.previous}
        isNextExists={!!data?.next}
        currentPage={page}
        isLoading={isFetching}
        onPageChange={handlePageButtonClick}
        mt={10}
      />
    </>
  );
};

export default Home;
