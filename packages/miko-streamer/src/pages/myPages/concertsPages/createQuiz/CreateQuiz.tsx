import { Box, Center, Divider, Flex, Grid, Heading } from '@chakra-ui/react';
import Screen169 from '@src/components/hoc/Screen169';
import { draftQuizChoicesState, draftQuizState } from '@src/state/recoil/draftQuizState';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import SaveMetaDataBtn from '../../../../components/button/SaveQuizBtn';
import ChoiceAddBox from './ChoiceAddBox';
import ChoiceBox from './ChoiceBox';
import EditQuizCommonData from './EditQuizCommonData';
import EditQuizOptions from './EditQuizOptions';
import QuizResetBtn from './QuizResetBtn';
import QuizTitle from './QuizTitle';

const CreateQuiz = () => {
  const [draftQuizChoices, setDraftQuizChoices] = useRecoilState(draftQuizChoicesState);
  const [draftQuiz, setDraftQuiz] = useRecoilState(draftQuizState);

  const isFull = useMemo(() => draftQuizChoices.length >= 4, [draftQuizChoices]);
  const [width, height] = useMemo(() => {
    const l = draftQuizChoices.length;
    const [w, h] = [25, 35];

    switch (l) {
      case 0:
        return [w, h];
      case 1:
        return [w * 2, h];
      case 2:
        return [w * 2, h * 2];
      case 3:
        return [w * 2, h * 2];
      case 4:
      default:
        return [w * 2, h * 2];
    }
  }, [draftQuizChoices]);

  return (
    <Flex h="full">
      <Box flexGrow={1} px="2" py="2">
        <Heading size="md">アンケート・クイズ</Heading>
        <Screen169>
          <Center w="full" h="full" flexDir="column">
            <QuizTitle />
            <Grid templateColumns={`repeat(${width / 25}, 1fr)`} width={width + '%'} height={height + '%'} gap="4" bgColor="#00000055" borderRadius="md">
              {draftQuizChoices?.map((text, idx) => (
                <ChoiceBox key={idx} text={text} idx={idx} />
              ))}
              {!isFull && <ChoiceAddBox />}
            </Grid>
          </Center>
        </Screen169>
      </Box>
      <Box maxW="400px" h="full" overflowY="scroll" px="2">
        <Flex flexWrap="wrap">
          <EditQuizOptions />
          <Divider my="4" />
          <EditQuizCommonData />
        </Flex>
        <Divider my="4" />
        <Flex justifyContent="end">
          <QuizResetBtn />
          <SaveMetaDataBtn savedMetaData={draftQuiz} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreateQuiz;
