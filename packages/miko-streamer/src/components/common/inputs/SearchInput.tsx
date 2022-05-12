import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Button, InputGroup } from '@chakra-ui/react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { createSearchParams } from '@src/helper/createSearchParams';
import React, { FC, useState } from 'react';

interface ISearchInput {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: FC<ISearchInput> = ({ setQuery }) => {
  const [value, setValue] = useState('');

  const handleUpdate = () => {
    setTimeout(() => {
      setQuery(createSearchParams(value));
    }, 0);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => setValue(event.target.value);

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      console.log('enter');
      handleUpdate();
    }
  };

  return (
    <InputGroup w="96" alignSelf="end">
      <InputLeftElement color="gray.500">
        <FiSearch />
      </InputLeftElement>
      <Input value={value} onChange={handleChange} onKeyDown={handleEnter} placeholder="Search for articles..." />
      <InputRightElement pointerEvents="none" mr="4px">
        <Button size="sm" onClick={handleUpdate}>
          <SearchIcon color="gray.300" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
