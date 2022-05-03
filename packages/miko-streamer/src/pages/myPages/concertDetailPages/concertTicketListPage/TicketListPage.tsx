import { Box, Circle, Flex, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Ticket } from '@miko/share-types';
import { AiOutlineFieldTime } from '@react-icons/all-files/ai/AiOutlineFieldTime';
import { FaExpandArrowsAlt } from '@react-icons/all-files/fa/FaExpandArrowsAlt';
import AsLink from '@src/components/common/wrapChakra/AsLink';
import convertDate from '@src/helper/convertDate';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const TicketBox: FC<{ data: Ticket }> = ({ data }) => {
  const { archiveEndTime, concertEndDate, concertStartDate, price, runningTime, saleEndDate, saleStartDate, concertId, id } = data;

  return (
    <Box w="sm" bg={useColorModeValue('white', 'gray.800')} shadow="md" rounded="lg" overflow="hidden">
      <Flex alignItems="center" h="50px" w="full" color="white" bgColor="blackAlpha.800" pl="2">
        <Heading size="md">日にち・{convertDate(concertStartDate, 'YMDHMS')} </Heading>
      </Flex>
      <VStack py={4} px={6} gap="1" alignItems="start" position="relative">
        <HStack>
          <Circle size="30px" bg="blackAlpha.800" color="white">
            円
          </Circle>
          <Text> {price} 円 </Text>
        </HStack>
        <HStack>
          <Circle size="30px" bg="blackAlpha.800" color="white">
            <AiOutlineFieldTime />
          </Circle>
          <Text> {runningTime}分 </Text>
        </HStack>
        <Heading size="md">ID {id} </Heading>
        <Heading size="sm">アーカイブ終了日にち</Heading>
        <Text>
          <Text> {convertDate(archiveEndTime, 'YMDHMS')} </Text>
        </Text>

        <Heading size="sm">コンサー公演時間</Heading>
        <Text>
          {convertDate(concertStartDate, 'YMDHMS')}~{convertDate(concertEndDate, 'HMS')}{' '}
        </Text>
        <Heading size="sm">チケット販売期間</Heading>
        <Text>
          {convertDate(saleStartDate, 'YMDHMS')}~{convertDate(saleEndDate, 'HMS')}{' '}
        </Text>
        <Box position="absolute" right="10px" top="5px">
          <AsLink to={`/my/concerts/${concertId}/admin/${id}`}>
            <FaExpandArrowsAlt size="25px" />
          </AsLink>
        </Box>
      </VStack>
    </Box>
  );
};

const TicketCardList: FC = () => {
  let { concertId } = useParams();

  const { data } = usePageLaravel('/tickets', { perPage: 40, filter: [['concert_id', concertId as string]], sort: ['id'] });

  if (!data) return <Box>no data</Box>;

  const tickets = data.data;

  return (
    <Flex flexWrap="wrap" w="full" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
      {tickets.map(ticket => (
        <TicketBox key={ticket.id} data={ticket} />
      ))}
    </Flex>
  );
};

const TicketListPage = () => {
  return (
    <Box style={{ padding: '1rem 0' }} bgColor="white" width="full" height="full">
      <Text>TicketListPage</Text>
      <TicketCardList />
    </Box>
  );
};

export default TicketListPage;
