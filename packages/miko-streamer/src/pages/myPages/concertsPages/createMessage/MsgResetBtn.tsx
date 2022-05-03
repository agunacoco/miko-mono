import { Button } from '@chakra-ui/react';
import { draftMsgState } from '@src/state/recoil/draftMessageState';
import { useResetRecoilState } from 'recoil';

const MsgResetBtn = () => {
  const resetDraftMessage = useResetRecoilState(draftMsgState);

  const handleReset = () => {
    resetDraftMessage();
  };

  return <Button onClick={handleReset}>リセット</Button>;
};

export default MsgResetBtn;
