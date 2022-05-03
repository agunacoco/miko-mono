import { Box, Text } from '@chakra-ui/react';
import { MsgTextData } from '@miko/share-types';
import { draftMsgState } from '@src/state/recoil/draftMessageState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

// const EditableText: FC<{ type: 'mt' | 'st' }> = ({ type }) => {
//   const draftMessage = useRecoilValue(draftMsgState);

//   function EditableControls() {
//     const {
//       isEditing,
//       getSubmitButtonProps,
//       getCancelButtonProps,
//       getEditButtonProps,
//     } = useEditableControls();

//     return (
//       <Box position="absolute" right="-10px" transform="translate(100%,0)">
//         {isEditing ? (
//           <ButtonGroup justifyContent="center" size="sm">
//             <IconButton
//               icon={<CheckIcon />}
//               {...getSubmitButtonProps()}
//               aria-label="a"
//             />
//             <IconButton
//               icon={<CloseIcon />}
//               {...getCancelButtonProps()}
//               aria-label="a"
//             />
//           </ButtonGroup>
//         ) : (
//           <Flex justifyContent="center">
//             <IconButton
//               size="sm"
//               icon={<EditIcon />}
//               {...getEditButtonProps()}
//               aria-label="a"
//             />
//           </Flex>
//         )}
//       </Box>
//     );
//   }

//   const handleOnSubmit = (text: string) => {
//     switch (type) {
//       case 'mt':
//         setDraftMessage((pre) => ({ ...pre, mt: text }));
//         break;
//       case 'st':
//         setDraftMessage((pre) => ({ ...pre, st: text }));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Editable
//       //   textAlign="start"
//       defaultValue={type === 'mt' ? draftMessage.mt : draftMessage.st}
//       fontSize="2xl"
//       isPreviewFocusable={false}
//       width="auto"
//       display="flex"
//       position="relative"
//       onSubmit={handleOnSubmit}
//       placeholder={type === 'mt' ? '메인 텍스트' : '서브 텍스트'}
//       color={type === 'mt' ? draftMessage.mtc : draftMessage.stc}
//     >
//       <EditablePreview />
//       <EditableInput width="auto" />
//       <EditableControls />
//     </Editable>
//   );
// };

const positionSwith = {
  1: { left: 0, top: 0 },
  2: { left: '50%', top: 0, transform: 'translate(-50%,0)' },
  3: { right: 0, top: 0 },
  4: { left: 0, top: '50%', transform: 'translate(0,-50%)' },
  5: { left: '50%', top: '50%', transform: 'translate(-50%,-50%)' },
  6: { right: 0, top: '50%', transform: 'translate(0,-50%)' },
  7: { left: 0, bottom: 0 },
  8: { left: '50%', bottom: 0, transform: 'translate(-50%,0)' },
  9: { right: 0, bottom: 0 },
};

const MessageText: FC<{ data: MsgTextData }> = ({ data }) => {
  const { text, bold, font, size, hexColor } = data;
  return (
    <Text fontSize={size} fontFamily={font} fontWeight={bold} color={hexColor}>
      {text}
    </Text>
  );
};

const DraftMessagePreview = () => {
  //   const positionIndex = useRecoilValue(draftMsgPositionState);
  //   const boxData = useRecoilValue(draftMsgBoxDataState);
  const draftMsgData = useRecoilValue(draftMsgState);
  const { boxData, mainTextData, subTextData, positionIndex } = draftMsgData.data;
  return (
    <Box position="absolute" {...positionSwith[positionIndex]} bgColor={boxData?.hexColor} width={boxData.width} height={boxData.height} borderRadius={boxData.round}>
      {/* <EditableText type="mt" />
      <EditableText type="st" /> */}
      <MessageText data={mainTextData} />
      <Box height={boxData.spacing + 'px'}></Box>
      <MessageText data={subTextData} />
    </Box>
  );
};

export default DraftMessagePreview;
