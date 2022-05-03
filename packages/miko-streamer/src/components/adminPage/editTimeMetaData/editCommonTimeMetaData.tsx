import { Badge, Box, Button, Flex, Heading, Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import convertDate from '@src/helper/convertDate';
import produce from 'immer';
import React, { FC, useState } from 'react';
import { SetterOrUpdater } from 'recoil';

interface Props {
  createdAt: number;
  useTag: [string[], SetterOrUpdater<string[]>];
  useTitle: [string, SetterOrUpdater<string>];
}

const EditCommonTimeMetaData: FC<Props> = ({ useTag, useTitle, createdAt }) => {
  // const [createdAt, setCreatedAt] = useRecoilState(draftQuizCreatedAtState);
  const [tags, setTags] = useTag;
  const [title, setTitle] = useTitle;
  const [newTag, setNewTag] = useState('');
  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
  };

  const handleTagRemove = (idx: number) => {
    setTags(prev =>
      produce(prev, draft => {
        draft.splice(idx, 1);
      }),
    );
  };

  const handleChangeNewTag: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag !== '') {
      setNewTag('');
      setTags(prev => [...prev, newTag]);
    }
  };

  return (
    <Flex gap="4" flexDir="column" minW="300px" flexGrow={1}>
      <Badge>{createdAt === -1 ? '新しいデータ' : convertDate(createdAt, 'YMDHMS')}</Badge>

      <Box>
        <Heading size="md">保存名</Heading>
        <Input value={title} onChange={handleChangeText}></Input>
      </Box>

      <Box>
        <Heading size="md">タグ</Heading>
        <Box>
          <Input w="200px" value={newTag} onChange={handleChangeNewTag} />
          <Button onClick={handleAddTag} disabled={newTag === ''}>
            <IoMdAdd />
          </Button>
        </Box>
        <Flex gap={4} flexWrap="wrap" py="2">
          {tags.map((tag, idx) => (
            <Tag size="md" key={tag + idx} borderRadius="full" variant="solid">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(idx)} />
            </Tag>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditCommonTimeMetaData;
