import { Box, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { draftMsgMainTextState } from '@src/state/recoil/draftMessageState';
import { FC, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useRecoilState } from 'recoil';

const ColorPickerPopoverContent: FC<{
  color: string;
  onChnage: (newValue: string) => void;
}> = ({ color, onChnage }) => {
  return (
    <PopoverContent width="fit-content">
      <PopoverArrow />
      <PopoverBody p="0">
        <ChromePicker
          color={color}
          onChangeComplete={(color) => onChnage(color.hex)}
          // disableAlpha
        />
      </PopoverBody>
    </PopoverContent>
  );
};

const TextColorPicker: FC<{
  color: string;
  onChnage: (newValue: string) => void;
}> = ({ color, onChnage }) => {
  const [draftMsgMainText, setDraftMsgMainText] = useRecoilState(draftMsgMainTextState);

  const [first, setFirst] = useState('a');

  return (
    <HStack>
      <Popover>
        <PopoverTrigger>
          <HStack>
            <Box w="6" h="6" bgColor={color} shadow="base"></Box>
            <Text>{color} </Text>
          </HStack>
        </PopoverTrigger>
        <ColorPickerPopoverContent color={color} onChnage={onChnage} />
      </Popover>
    </HStack>
  );
};

export default TextColorPicker;
