import { Box, Button, Center, Flex, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import convertDate, { convertDateUTC, roundDayJsBy30 } from '@src/helper/convertDate';
import dayjs, { ManipulateType } from 'dayjs';
import { FC, Suspense, useRef, useState } from 'react';

import NivoLineChart from './NivoLineChart';

const LEFT_MARGIN = 60;

const Loading = () => {
  return (
    <Center w="full" h="full">
      <Spinner boxSize="100px" />
    </Center>
  );
};

type Props = {
  title: string;
  type: string;
  colors?: string | string[];
};

const DefaultChart: FC<Props> = ({ title, type, colors }) => {
  const startRef = useRef(roundDayJsBy30(dayjs()).subtract(30, 'm'));
  const endRef = useRef(roundDayJsBy30(dayjs()).add(30, 'm'));

  const [start, setStart] = useState(convertDateUTC(startRef.current, 'ISO8601NoZ'));
  const [end, setEnd] = useState(convertDateUTC(endRef.current, 'ISO8601NoZ'));

  const handleSetTime = (value: number, unit: ManipulateType) => {
    // NOTE dayjs immutable하다
    startRef.current = startRef.current.add(value, unit);
    endRef.current = endRef.current.add(value, unit);
    setStart(convertDateUTC(startRef.current, 'ISO8601NoZ'));
    setEnd(convertDateUTC(endRef.current, 'ISO8601NoZ'));
  };

  return (
    <Flex flexDir="column" h="50vh" w="50%" minW="500px" flexGrow={1}>
      <HStack w="full" justifyContent="space-between" flexWrap="wrap" alignItems="center" py="10px" rowGap="10px">
        <HStack alignItems="end" minW="500px">
          <Heading>{title}</Heading>
          <Text fontSize="2xl">
            {convertDate(startRef.current, 'YMDHM')} ~ {convertDate(endRef.current, 'HM')}
          </Text>
        </HStack>
        <HStack flexGrow={1} alignItems="center" pr="10" justifyContent="end">
          <Button colorScheme="cyan" onClick={() => handleSetTime(-30, 'm')}>
            -30m
          </Button>
          <Button colorScheme="pink" onClick={() => handleSetTime(30, 'm')}>
            +30m
          </Button>
        </HStack>
      </HStack>
      {/* <Button onClick={handleDraw}>draw</Button> */}
      <Box flexGrow={1}></Box>
      <Suspense fallback={<Loading />}>
        <NivoLineChart start={start} end={end} type={type} colors={colors} />
      </Suspense>
    </Flex>
  );
};

export default DefaultChart;
