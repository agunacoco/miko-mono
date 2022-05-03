import { AspectRatio, Box } from '@chakra-ui/react';
import FileInputBtn from '@src/components/button/FileInputBtn';
import { screenImageState } from '@src/state/recoil/screenImage';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

const Screen169: FC = ({ children }) => {
  const imageUrl = useRecoilValue(screenImageState);
  return (
    <AspectRatio position="relative" ratio={16 / 9} bgColor="blackAlpha.300" background={imageUrl && `url(${imageUrl})`} backgroundSize="cover" m="4" border="2px">
      <Box position="absolute" width="full" height="full">
        {children}
        <FileInputBtn />
      </Box>
    </AspectRatio>
  );
};

export default Screen169;
