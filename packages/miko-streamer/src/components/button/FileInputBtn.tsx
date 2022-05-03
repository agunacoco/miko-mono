import { Box, Button } from '@chakra-ui/react';
import { screenImageState } from '@src/state/recoil/screenImage';
import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

const FileInputBtn = () => {
  const setImageUrl = useSetRecoilState(screenImageState);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      const objectUrl = URL.createObjectURL(fileUploaded);
      setImageUrl(objectUrl);
    }
  };

  return (
    <Box position="absolute" right="0px" top="0px">
      <Button onClick={handleClick} size="sm" colorScheme="blackAlpha" opacity="0.8">
        背景画像
      </Button>
      <input type="file" aria-label="upload screen background image" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
    </Box>
  );
};

export default FileInputBtn;
