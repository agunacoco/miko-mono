import { AspectRatio, Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { convertDate } from '@src/helper';
import { curUserTicketState, enterTicketDataState } from '@src/state/recoil';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { RoomSelect } from '../RoomSelect';

const IMAGE_URL = '/image/ticketbg.jpg';

const TicketLeftPart = () => {
  const { concert } = useRecoilValue(curUserTicketState);
  const curTicket = useRecoilValue(enterTicketDataState);
  const startDate = convertDate(curTicket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const endDate = convertDate(curTicket.concertEndDate, 'YMDHM'); // 티켓 끝나는 날

  return (
    <>
      <AspectRatio
        borderLeftRadius="2xl"
        w="50vw"
        shadow="xl"
        ratio={20 / 7}
        bgPosition="40% 70%"
        bgRepeat="no-repeat"
        bgSize="150%"
        bgImage={IMAGE_URL}
        bgPos="center"
        backgroundSize="cover"
      >
        <Stack borderRight="dashed" w="full" h="full" p={12} spacing={4} color="white">
          <Box w="full">
            <Text color="orange.200" fontSize="xl">
              {concert.artist}
            </Text>
            <Text lineHeight="none" fontSize="5xl" fontWeight="bold">
              {concert.title}
            </Text>
            <Text color="pink.400" fontSize="3xl">
              Live Concert
            </Text>
            <Text pt={5} fontSize="2xl" fontWeight="semibold">
              {startDate} ~ {endDate}
            </Text>
            <RoomSelect />
          </Box>
        </Stack>
      </AspectRatio>
    </>
  );
};

export default TicketLeftPart;
