import { Badge, Box, Flex, Input, Select, Stack } from '@chakra-ui/react';
import {
  metadataListFilterSearchState,
  metadataListFilterTagState,
  metadataListFilterTypeState,
  metadataListFilterUsedState,
  metadataTagListState,
} from '@src/state/recoil/metadataState';
import { ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const TypeFilter = () => {
  const [type, setType] = useRecoilState(metadataListFilterTypeState);

  const usedBadge = () => {
    if (type === 'all') return <Badge>全部</Badge>;
    if (type === 'm') return <Badge>メッセージ</Badge>;
    if (type === 'q') return <Badge>アンケート</Badge>;
  };

  const handleChangeUsed = () => {
    if (type === 'all') return setType('m');
    if (type === 'm') return setType('q');
    if (type === 'q') return setType('all');
  };

  return (
    <Box w="100px" onClick={handleChangeUsed}>
      {usedBadge()}
    </Box>
  );
};

const UsedFilter = () => {
  const [used, setUsed] = useRecoilState(metadataListFilterUsedState);

  const usedBadge = () => {
    if (used === 'all') return <Badge>全部</Badge>;
    if (used === 'notUsed') return <Badge>使用前</Badge>;
    if (used === 'used') return <Badge>使用済み</Badge>;
  };

  const handleChangeUsed = () => {
    if (used === 'all') return setUsed('notUsed');
    if (used === 'notUsed') return setUsed('used');
    if (used === 'used') return setUsed('all');
  };

  return (
    <Box w="100px" onClick={handleChangeUsed}>
      {usedBadge()}
    </Box>
  );
};

const SearchFilter = () => {
  const [search, setSearch] = useRecoilState(metadataListFilterSearchState);

  return (
    <Input
      value={search}
      onChange={e => {
        setSearch(e.target.value);
      }}
    />
  );
};

const TagFilter = () => {
  const tagList = useRecoilValue(metadataTagListState);
  const [tag, setTag] = useRecoilState(metadataListFilterTagState);

  const handleTagSelect: ChangeEventHandler<HTMLSelectElement> = e => {
    setTag(e.target.value);
  };

  return (
    <Select placeholder="Select option" onChange={handleTagSelect} value={tag} defaultValue={tag}>
      <option key={' '} value={' '}>
        タグ
      </option>
      {tagList.map(tag => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </Select>
  );
};

const MetadataListFilter = () => {
  return (
    <Flex flexDir="column">
      <Flex>
        <TypeFilter />
        <UsedFilter />
        <SearchFilter />
        <Stack spacing={3}>
          <TagFilter />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default MetadataListFilter;
