import { Center, GridItem } from '@chakra-ui/react';
import { draftQuizChoicesState } from '@src/state/recoil/draftQuizState';
import produce from 'immer';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

const ChoiceAddBox: FC = () => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);
  const handleInitializeNewChoice = () => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft.push('');
        return draft;
      }),
    );
  };

  return (
    <GridItem bgColor="white" borderRadius="2xl" p="3">
      <Center h="full" onClick={handleInitializeNewChoice}>
        +
      </Center>
    </GridItem>
  );
};

export default ChoiceAddBox;
