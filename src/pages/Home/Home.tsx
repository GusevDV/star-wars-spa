import { Grid, Skeleton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Pagination from 'widgets/Pagination';
import Search from 'widgets/Search';
import { swapi } from 'shared/api';
import PersonCard from './ui/PersonCard';

const Home = () => {
  const [page, setPage] = useState(1);
  const [getPeople, { data, isFetching }] = swapi.useLazyGetAllPeopleQuery();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const handlePageButtonClick = (page: number) => {
    setPage(page);
    getPeople({ page });
  };

  const handleSearchChange = (search: string) => {
    if (search) {
      getPeople({ search: search });
    } else {
      getPeople({ page });
    }

    setPage(1);
  };

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
        {isFetching && [...Array(10)].map((_, i) => <Skeleton key={i} h={40} borderRadius={10} />)}
        {isShowNothingFound && <Text>Nothing found</Text>}
        {isShowCards &&
          data.results.map(({ id, name }) => (
            <PersonCard key={id} name={name} id={id}></PersonCard>
          ))}
      </Grid>
      <Pagination
        currentPage={page}
        totalCount={data ? data.count : 0}
        pageSize={data ? data.results.length : 0}
        isLoading={isFetching}
        onPageChange={handlePageButtonClick}
        mt={10}
      />
    </>
  );
};

export default Home;
