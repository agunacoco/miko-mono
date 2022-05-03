import { Box, Button, GridItem, Input, Text } from '@chakra-ui/react';
import { draftQuizChoicesState } from '@src/state/recoil/draftQuizState';
import produce from 'immer';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';

const ChoiceEdit: FC<{ text: string; idx: number }> = ({ text, idx }) => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);
  const handleOnChoiceTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft[idx] = e.target.value;
      }),
    );
  };

  return (
    <Box>
      <Input value={text} onChange={e => handleOnChoiceTextChange(e)}></Input>
    </Box>
  );
};
const ChoiceBox: FC<{ text: string; idx: number }> = ({ text, idx }) => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);

  const handleDeleteChoice = () => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft.splice(idx, 1);
        return draft;
      }),
    );
  };

  return (
    <GridItem bgColor="white" borderRadius="2xl" p="3" position="relative">
      <Text>{idx + 1}</Text>
      <ChoiceEdit text={text} idx={idx} />
      <Button size="xs" onClick={handleDeleteChoice} position="absolute" bottom="2" right="2" colorScheme="red">
        X
      </Button>
    </GridItem>
  );
};

export default ChoiceBox;
