/* eslint-disable jsx-a11y/media-has-caption */
import { AspectRatio, Box, HStack } from '@chakra-ui/react';
import FileInputBtn from '@src/components/button/FileInputBtn';
import { screenImageState } from '@src/state/recoil/screenImage';
import { FC, ReactElement, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { cameraStreamState } from '../../state/recoil';
import BackgroundCameraSelectBtn from '../button/BackgroundCameraSelectBtn';

const Screen169: FC<{ children?: ReactElement }> = ({ children }) => {
  const imageUrl = useRecoilValue(screenImageState);

  const myStream = useRecoilValue(cameraStreamState);

  useEffect(() => {
    const videoDom = document.getElementById('camera-video') as HTMLVideoElement;
    videoDom.srcObject = myStream;
    videoDom.play();
  }, []);

  return (
    <AspectRatio position="relative" ratio={16 / 9} bgColor="blackAlpha.300" background={imageUrl && `url(${imageUrl})`} backgroundSize="cover" m="4" border="2px">
      <Box zIndex="1">
        <Box position="absolute" width="full" height="full">
          {children}
          <HStack position="absolute" top="0" right="0">
            <BackgroundCameraSelectBtn />
            <FileInputBtn />
          </HStack>
        </Box>
        <video id="camera-video" width="100%" height="100%" autoPlay style={{ pointerEvents: 'none' }} />
      </Box>
    </AspectRatio>
  );
};

export default Screen169;
