import { Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { convertDate } from '@src/helper';
import { curUserTicketState, enterTicketDataState } from '@src/state/recoil';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { RoomSelect } from '../RoomSelect';

const TicketLeftPart = () => {
  const { concert } = useRecoilValue(curUserTicketState);
  const curTicket = useRecoilValue(enterTicketDataState);
  const startDate = convertDate(curTicket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const endDate = convertDate(curTicket.concertEndDate, 'YMDHM'); // 티켓 끝나는 날

  return (
    <Stack shadow="xl" className="card cardLeft" bgPosition="40% 70%" bgRepeat="no-repeat" bgSize="150%" bgImage="/image/ticketbg.jpg" spacing={4} p={12} flex="0.7" color="white">
      <HStack spacing={5}>
        <Text fontSize="5xl" fontWeight="bold">
          {concert.title}
        </Text>
        <Text color="yellow.400" pt={6} fontFamily="body" fontWeight="semibold" fontSize="xl">
          {concert.artist}
        </Text>
      </HStack>
      <Text className="word" color="gray.200">
        {concert.detail}
      </Text>
      <Flex w="full" borderTopWidth="1px" h="3px" borderTopColor="gray.100" />
      <Text fontSize="2xl" fontWeight="semibold">
        {startDate} ~ {endDate}
      </Text>
      <RoomSelect />
    </Stack>
  );
};

export default TicketLeftPart;
