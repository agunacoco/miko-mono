import { Box, Input } from '@chakra-ui/react';
import { draftQuizMainTitleState } from '@src/state/recoil/draftQuizState';
import React, { FC, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';

const QuizTitle: FC = () => {
  const [title, setTitle] = useRecoilState(draftQuizMainTitleState);
  const fontSize = 12;
  const hiddenTextRef = useRef<HTMLDivElement>(null);
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const inputWidth = useMemo(() => {
    if (hiddenTextRef.current) {
      hiddenTextRef.current.innerHTML = title;
      console.log('width', hiddenTextRef.current.offsetWidth);
      return hiddenTextRef.current.offsetWidth;
    }
  }, [title]);

  return (
    <Box padding="5">
      <Input value={title} color="white" backgroundColor="#00000055" onChange={handleOnChange} fontSize={fontSize + 'px'} minW="300px" w={inputWidth}></Input>
      <Box position="absolute" visibility="hidden" fontSize={fontSize + 'px'} ref={hiddenTextRef} overflowWrap="normal"></Box>
    </Box>
  );
};

export default QuizTitle;
