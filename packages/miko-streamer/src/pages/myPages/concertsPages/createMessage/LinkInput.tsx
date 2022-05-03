import { Heading, HStack, Input } from '@chakra-ui/react';
import { draftMsgUrlState } from '@src/state/recoil/draftMessageState';
import { useRecoilState } from 'recoil';

const LinkInput = () => {
  const [draftMsgUrl, setDraftMsgUrl] = useRecoilState(draftMsgUrlState);

  return (
    <HStack>
      <Heading size="md">リンク</Heading>
      <Input placeholder="Url" width="auto" value={draftMsgUrl} onChange={(e) => setDraftMsgUrl(e.target.value)} />
    </HStack>
  );
};

export default LinkInput;
