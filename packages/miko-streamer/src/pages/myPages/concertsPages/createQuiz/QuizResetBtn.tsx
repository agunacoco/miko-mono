import { Button } from '@chakra-ui/react';
import { draftQuizState } from '@src/state/recoil/draftQuizState';
import { useResetRecoilState } from 'recoil';

const QuizResetBtn = () => {
  const resetDraftQuiz = useResetRecoilState(draftQuizState);

  const handleReset = () => {
    resetDraftQuiz();
  };

  return <Button onClick={handleReset}>リセット</Button>;
};

export default QuizResetBtn;
