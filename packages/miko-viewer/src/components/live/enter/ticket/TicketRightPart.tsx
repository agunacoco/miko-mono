import { Box, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { curUserTicketState, enterRoomIdState, enterTicketDataState } from '@src/state/recoil';
import router from 'next/router';
import { AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { convertDate, setCookie } from '@src/helper';
import { USER_TICKET_COOKIE } from '@src/const';
import { MotionBox } from '@src/components/common/motion/MotionChakra';

const MAX_TEAR_MOUNT = 700;

const TicketRightPart = () => {
  const { concert } = useRecoilValue(curUserTicketState);
  const curTicket = useRecoilValue(enterTicketDataState);
  const startDate = convertDate(curTicket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const curUserTicket = useRecoilValue(curUserTicketState);
  const roomId = useRecoilValue(enterRoomIdState);
  const ticketRef = useRef<HTMLElement>();
  const [isEnterStart, setIsEnterStart] = useState(false);

  const tearMount = useMotionValue(0);
  const tearRange = [0, MAX_TEAR_MOUNT];
  const rotateRange = [0, 90];
  const rotate = useTransform(tearMount, tearRange, rotateRange);

  const enterHandler = () => {
    setCookie(USER_TICKET_COOKIE, curUserTicket.id + '', 6);
    router.push('/live/viewing', '', { shallow: false });
  };

  const update = ({ x, y }: { x: number; y: number }) => {
    if (ticketRef.current) ticketRef.current.style.transform = `rotate(${rotate.get()}deg)`;
    if (rotate.get() > 40) {
      setIsEnterStart(true);
    } else {
      tearMount.set(x + y);
    }
  };

  return (
    <>
      <Box position="relative" cursor="pointer" w="20vw" h="full" overflow="visible">
        <AnimatePresence>
          {isEnterStart ? (
            <MotionBox
              zIndex="9999"
              key="enter"
              position="absolute"
              width="0"
              height="0"
              animate={{ width: [0, 10, 10], height: [0, 10, 10], scale: [0, 0, 500] }}
              onAnimationComplete={() => enterHandler()}
              backgroundColor="white"
              borderRadius="full"
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          ) : (
            <MotionBox
              exit={{
                x: [0, 40, 20],
                y: [0, -20, 1000],
                opacity: [1, 1, 0],
                transition: {
                  duration: 1,
                  type: 'spring',
                },
              }}
              h="full"
            >
              <MotionBox
                key="ticket"
                w="full"
                h="full"
                ref={ticketRef}
                style={{ transform: `rotate(${rotate.get()}deg)`, transformOrigin: '0 100%' }}
                onPan={(e, info) => requestAnimationFrame(() => update(info.offset))}
              >
                <Stack shadow="xl" h="full" w="full" color="white" flex="0.3" p={7} justify="center" align="start" bg="linear-gradient( to top, purple, pink )">
                  <Text color="cyan" fontSize="xl" fontWeight="semibold">
                    {concert.artist}
                  </Text>
                  <Text lineHeight={10} fontSize="5xl" fontWeight="extrabold">
                    {concert.title}
                  </Text>
                  <Text color="yellow" fontSize="2xl" fontWeight="extrabold">
                    {startDate}
                  </Text>
                  <Box py={5}>
                    <Text w="330px" color="cyan.300" fontSize="md">
                      {roomId ? 'PRIVATE ROOM ID' : 'PUBLIC ROOM'}
                    </Text>
                    <Text w="330px" fontSize="2xl" fontWeight="bold">
                      {roomId}
                    </Text>
                  </Box>
                  <Box className="barcode" />
                </Stack>
              </MotionBox>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
      <style>
        {`
        .word {
        display: block;
        overflow: hidden;
        white-space: normal;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        }

        .barcode {
          height: 4em;
          width: 0;
          margin: 1.2em 0 0 .8em;
          box-shadow: 1px 0 0 1px #343434,
          5px 0 0 1px #343434,
          10px 0 0 1px #343434,
          11px 0 0 1px #343434,
          15px 0 0 1px #343434,
          18px 0 0 1px #343434,
          22px 0 0 1px #343434,
          23px 0 0 1px #343434,
          26px 0 0 1px #343434,
          30px 0 0 1px #343434,
          35px 0 0 1px #343434,
          37px 0 0 1px #343434,
          41px 0 0 1px #343434,
          44px 0 0 1px #343434,
          47px 0 0 1px #343434,
          51px 0 0 1px #343434,
          56px 0 0 1px #343434,
          59px 0 0 1px #343434,
          64px 0 0 1px #343434,
          68px 0 0 1px #343434,
          72px 0 0 1px #343434,
          74px 0 0 1px #343434,
          77px 0 0 1px #343434,
          81px 0 0 1px #343434,
          85px 0 0 1px #343434,
          89px 0 0 1px #343434,
          91px 0 0 1px #343434,
          94px 0 0 1px #343434,
          97px 0 0 1px #343434,
          100px 0 0 1px #343434,
          105px 0 0 1px #343434,
          110px 0 0 1px #343434,
          111px 0 0 1px #343434,
          115px 0 0 1px #343434,
          118px 0 0 1px #343434,
          122px 0 0 1px #343434,
          123px 0 0 1px #343434,
          126px 0 0 1px #343434,
          130px 0 0 1px #343434,
          135px 0 0 1px #343434,
          137px 0 0 1px #343434,
          141px 0 0 1px #343434,
          144px 0 0 1px #343434,
          147px 0 0 1px #343434,
          151px 0 0 1px #343434,
          156px 0 0 1px #343434,
          159px 0 0 1px #343434,
          164px 0 0 1px #343434,
          168px 0 0 1px #343434,
          172px 0 0 1px #343434,
          174px 0 0 1px #343434,
          177px 0 0 1px #343434,
          181px 0 0 1px #343434,
          185px 0 0 1px #343434,
          189px 0 0 1px #343434,
          191px 0 0 1px #343434,
          194px 0 0 1px #343434,
          197px 0 0 1px #343434,
          200px 0 0 1px #343434,
          205px 0 0 1px #343434,
          210px 0 0 1px #343434,
          211px 0 0 1px #343434,
          215px 0 0 1px #343434,
          218px 0 0 1px #343434,
          222px 0 0 1px #343434,
          223px 0 0 1px #343434,
          226px 0 0 1px #343434,
          230px 0 0 1px #343434,
          235px 0 0 1px #343434,
          237px 0 0 1px #343434,
          241px 0 0 1px #343434,
          244px 0 0 1px #343434,
          247px 0 0 1px #343434,
          251px 0 0 1px #343434,
          256px 0 0 1px #343434,
          259px 0 0 1px #343434,
          264px 0 0 1px #343434,
          268px 0 0 1px #343434,
          272px 0 0 1px #343434,
          274px 0 0 1px #343434,
          277px 0 0 1px #343434,
          281px 0 0 1px #343434,
          285px 0 0 1px #343434,
          289px 0 0 1px #343434,
          291px 0 0 1px #343434,
          294px 0 0 1px #343434,
          297px 0 0 1px #343434,
          300px 0 0 1px #343434,
          305px 0 0 1px #343434,
          310px 0 0 1px #343434,
          311px 0 0 1px #343434,
          315px 0 0 1px #343434,
          318px 0 0 1px #343434,
          322px 0 0 1px #343434,
          323px 0 0 1px #343434,
          326px 0 0 1px #343434,
          330px 0 0 1px #343434,
          335px 0 0 1px #343434,
          337px 0 0 1px #343434,
          341px 0 0 1px #343434,
          344px 0 0 1px #343434,
          347px 0 0 1px #343434,
          351px 0 0 1px #343434;
        }
        `}
      </style>
    </>
  );
};

export default TicketRightPart;
