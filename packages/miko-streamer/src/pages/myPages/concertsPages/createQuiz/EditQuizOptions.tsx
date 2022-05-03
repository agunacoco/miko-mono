import { Flex, Heading, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { draftQuizDurationTimeState } from '@src/state/recoil/draftQuizState';
import { useRecoilState } from 'recoil';

const MIN_QUIZ_DURATION_SECONDS = 10;
const MAX_QUIZ_DURATION_SECONDS = 300;

const EditQuizOptions = () => {
  const [durationTime, setDurationTime] = useRecoilState(draftQuizDurationTimeState);

  const handleChangeDurationTime = (value: number) => {
    setDurationTime(value);
  };

  return (
    <Flex minW="300px" flexGrow={1} flexDir="column" gap="4">
      <Heading size="md">詳細設定</Heading>

      <HStack>
        <Text>表示時間</Text>
        <NumberInput
          w="5rem"
          step={1}
          defaultValue={10}
          min={MIN_QUIZ_DURATION_SECONDS}
          max={MAX_QUIZ_DURATION_SECONDS}
          value={durationTime}
          onChange={(_, value) => handleChangeDurationTime(value)}
        >
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </Flex>
  );
};

export default EditQuizOptions;
