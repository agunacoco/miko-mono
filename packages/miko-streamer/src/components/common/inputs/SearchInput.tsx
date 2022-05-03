import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputRightElement } from '@chakra-ui/input';
import { Button, InputGroup } from '@chakra-ui/react';
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
    <InputGroup>
      <InputRightElement pointerEvents="none" mr="4px">
        <Button h="1.75rem" size="sm" onClick={handleUpdate}>
          <SearchIcon color="gray.300" />
        </Button>
      </InputRightElement>
      <Input value={value} onChange={handleChange} onKeyDown={handleEnter} placeholder="가게 검색" />
    </InputGroup>
  );
};

export default SearchInput;
