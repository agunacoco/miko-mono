import { Box, BoxProps, Button, Center, Flex, Heading, HStack, Text, useToast } from '@chakra-ui/react';
import useSocket from '@src/state/hooks/useSocket';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Rank = {
  score: number;
  value: string;
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return [...array];
}

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);
const MotionText = motion<Omit<BoxProps, 'transition'>>(Text);
const PER_PAGE = 30;

const RankingPage: FC = () => {
  const { ticketId, concertId } = useParams();
  const socket = useSocket();
  const toast = useToast();
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const getRank = (newRanks: Rank[]) => {
      setRanks(newRanks);
    };
    socket.on('be-all-rank', getRank);
    return () => {
      socket.off('be-all-rank', getRank);
    };
  }, [socket]);

  useEffect(() => {
    const requestNewRanks = () => {
      socket.emit('fe-all-rank', ticketId, start, start + PER_PAGE - 1);
    };

    requestNewRanks(); // interval은 ms 후에 첫 실행됨.
    const intervalId = setInterval(requestNewRanks, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socket, start]);

  return (
    <Box px="6" pt="10" h="full" overflowY="scroll">
      <Heading size="md">ランキング</Heading>
      <HStack gap="6">
        <Heading flexGrow={1}>
          {start + 1} ~ {start + PER_PAGE}{' '}
        </Heading>
        <HStack gap="2">
          <Button disabled={start === 0} onClick={() => setStart((prev) => prev - PER_PAGE)}>
            Before {PER_PAGE}
          </Button>
          <Button disabled={ranks.length < PER_PAGE} onClick={() => setStart((prev) => prev + PER_PAGE)}>
            Next {PER_PAGE}
          </Button>
          <Button
            onClick={() => {
              setRanks((prev) => shuffle(prev));
            }}
          >
            test - shuffle
          </Button>
        </HStack>
      </HStack>
      <Flex width="full">
        <LayoutGroup>
          <AnimatePresence>
            <MotionBox
              key={start}
              display="flex"
              flexDirection="column"
              width="full"
              h="680px"
              flexWrap="wrap"
              overflowX="scroll"
              overflowY="hidden"
              alignContent="start"
              justifyContent="start"
            >
              {ranks.map(({ score, value }, idx) => {
                return (
                  <MotionBox
                    key={value + score}
                    transition={{ duration: 0.3 }}
                    animate={{ y: [10, 0] }}
                    layoutId={value}
                    w="250px"
                    h="50px"
                    m="2"
                    px="4"
                    py="2"
                    display="flex"
                    border="1px"
                    borderRadius="3xl"
                    justifyContent="space-between"
                    alignItems="center"
                    shadow="base"
                  >
                    <Box w="80px">
                      <Heading display="inline-block">{idx + 1 + start} </Heading>
                    </Box>
                    <Box>
                      <Heading w="full" fontSize="md" isTruncated>
                        {value} / {score}
                      </Heading>
                    </Box>
                  </MotionBox>
                );
              })}
              {ranks.length === 0 && (
                <Center h="full" w="full">
                  <Heading>No Data</Heading>
                </Center>
              )}
            </MotionBox>
          </AnimatePresence>
        </LayoutGroup>
      </Flex>
    </Box>
  );
};

export default RankingPage;
