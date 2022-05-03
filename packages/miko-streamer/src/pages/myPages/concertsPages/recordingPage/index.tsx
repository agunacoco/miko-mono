import { AspectRatio, Box, Button, Flex, Heading, Image, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spinner, Text, Tooltip, useToast } from '@chakra-ui/react';
import { Recording } from '@miko/share-types';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import { calculateLastThumbnail, generateIvsM3U8, generateIvsThumbUrl } from '@src/helper';
import convertDate, { getTimeOfThumb } from '@src/helper/convertDate';
import { isOnMiniPlayerState, m3u8State } from '@src/state/recoil';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { FC, memo, useLayoutEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const LoadingImage = memo<{ prefix: string; idx: number }>(({ prefix, idx }) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
  }, [idx]);

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      <AspectRatio w="container.sm" ratio={16 / 9}>
        <Image objectFit="cover" onLoad={() => setIsLoading(false)} src={generateIvsThumbUrl(prefix, idx)} fallbackSrc="/image/fallback.png" alt={`thumb-image-${prefix}-${idx}`} />
      </AspectRatio>
      {isLoading && (
        <Box position="absolute">
          <Spinner boxSize="20" color="teal" />
        </Box>
      )}
    </Flex>
  );
});

LoadingImage.displayName = 'LoadingImage';

const RecordingBox: FC<{ recording: Recording }> = ({ recording }) => {
  const { id, prefix, start, end, stream_id, avl_archive } = recording;
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const setM3u8 = useSetRecoilState(m3u8State);
  const setIsOnMiniPlayer = useSetRecoilState(isOnMiniPlayerState);
  const lastThumbIdx = useMemo(() => calculateLastThumbnail(start, end), [recording]);

  const handlePlay = () => {
    setM3u8(generateIvsM3U8(prefix));
    setIsOnMiniPlayer(true);
  };

  return (
    <Box w="container.sm" id={stream_id}>
      <Text>{prefix}</Text>
      <Text>{convertDate(start, 'YMDHMS')}</Text>
      <Text>{end ? convertDate(end, 'YMDHMS') : 'not ended'}</Text>
      <Text>{end ? 'end' : 'ing'}</Text>
      <Button onClick={handlePlay}>Play</Button>
      {start && end && <Text> {lastThumbIdx} </Text>}
      <LoadingImage idx={sliderValue} prefix={prefix} />
      <Slider
        id="slider"
        defaultValue={5}
        min={0}
        max={lastThumbIdx}
        colorScheme="teal"
        onChange={v => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip hasArrow bg="teal.500" color="white" placement="top" isOpen={showTooltip} label={getTimeOfThumb(start, sliderValue)}>
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
};

const RecordingList = () => {
  const { ticketId, concertId } = useParams();

  const { data } = usePageLaravel('/recordings', { filter: [['ticket_id', ticketId as string]] });
  console.log(data);

  if (!data?.data) {
    return <Box>no data</Box>;
  }

  return (
    <Flex flexWrap="wrap">
      {data.data.map(recording => (
        <RecordingBox key={recording.id} recording={recording} />
      ))}
    </Flex>
  );
};

const RecordingPage: FC = () => {
  const toast = useToast();

  return (
    <Box px="6" pt="10" h="full" overflowY="scroll">
      <Heading size="md">レコーディング</Heading>
      <AsyncBoundary>
        <RecordingList />
      </AsyncBoundary>
    </Box>
  );
};

export default RecordingPage;
