import { Box, ScaleFade, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { msgMetaDataState } from '../../state/recoil';

const MSG_VIEW_DEFAULT_TIME = 1000 * 10;

const VideoMsgView = () => {
  const [msgMetaData, setMsgMetaData] = useRecoilState(msgMetaDataState);

  useEffect(() => {
    const setTimeoutId = setTimeout(
      () => {
        setMsgMetaData(undefined);
        console.info('aaaaaaaa');
      },
      msgMetaData?.data?.durationTime ? msgMetaData.data.durationTime * 1000 : MSG_VIEW_DEFAULT_TIME,
    );

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [msgMetaData]);

  if (!msgMetaData) return <></>;

  return (
    <ScaleFade initialScale={0.9} in={!!msgMetaData}>
      <a href={msgMetaData.data.urlString} target="_blank" rel="noreferrer">
        <Box position="absolute" top="2" left="2" zIndex="2" backgroundColor="whiteAlpha.700" textColor="black" padding="1" borderRadius="base">
          <Text fontSize="2xl">{msgMetaData.data.mainTextData.text}</Text>
          <Text fontSize="1xl">{msgMetaData.data.subTextData.text}</Text>
        </Box>
      </a>
    </ScaleFade>
  );
};

export default VideoMsgView;
