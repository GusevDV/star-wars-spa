import { Input } from '@chakra-ui/react';
import { ChangeEvent, useMemo } from 'react';
import { debounce } from './utils';

export type SearchProps = {
  onChange: (value: string) => void;
  callbackDelay?: number;
};

const Search = ({ callbackDelay = 500, onChange }: SearchProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const debouncedSearchChange = useMemo(
    () => debounce<[ChangeEvent<HTMLInputElement>]>(handleSearchChange, callbackDelay),
    []
  );

  return <Input placeholder="Search a hero" onChange={debouncedSearchChange} />;
};

export default Search;
