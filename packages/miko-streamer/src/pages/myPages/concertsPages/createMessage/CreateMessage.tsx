import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import SaveMetaDataBtn from '@src/components/button/SaveQuizBtn';
import Screen169 from '@src/components/hoc/Screen169';
import { draftMsgMainTextState, draftMsgState, draftMsgSubTextState } from '@src/state/recoil/draftMessageState';
import { useRecoilValue } from 'recoil';

import DraftMessagePreview from './DraftMessagePreview';
import DragTest from './DragTest';
import EditMsgCommonData from './EditMsgCommonData';
import LinkInput from './LinkInput';
import MsgBoxEditor from './MsgBoxEditor';
import MsgResetBtn from './MsgResetBtn';
import MsgTextDataEditor from './MsgTextDataEditor';
import { PositionSelector } from './PositionSelector';

const SaveBtn = () => {
  const msgMetaData = useRecoilValue(draftMsgState);

  return <SaveMetaDataBtn savedMetaData={msgMetaData} />;
};

const CreateMsg = () => {
  const msgMetaData = useRecoilValue(draftMsgState);
  console.log(msgMetaData);
  return (
    <Flex h="full">
      <Box flexGrow={1} px="2" py="2">
        <Heading size="md">メッセージ</Heading>
        <Box>
          <Screen169>
            <DraftMessagePreview />
          </Screen169>
        </Box>
      </Box>
      <Box maxW="400px" h="full" overflowY="scroll" px="2">
        <Flex flexWrap="wrap" flexDir="column">
          {/* <PositionSelector /> */}
          {/* <Divider my="4" /> */}
          {/* <MsgBoxEditor /> */}
          {/* <Divider my="4" /> */}
          <Flex flexDir="column" flexGrow={1} minW="200px" gap="2" alignItems="start">
            <MsgTextDataEditor atom={draftMsgMainTextState} type="main" />
            <MsgTextDataEditor atom={draftMsgSubTextState} type="sub" />
          </Flex>
          <Divider my="4" />
          <LinkInput />
          <Divider my="4" />
          <EditMsgCommonData />
        </Flex>
        {/* <DragTest /> */}

        <Divider my="4" />
        <Flex justifyContent="end" gap="4">
          <MsgResetBtn />
          <SaveBtn />
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreateMsg;
