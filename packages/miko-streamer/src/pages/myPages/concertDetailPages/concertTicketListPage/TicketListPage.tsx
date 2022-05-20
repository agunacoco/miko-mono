import { Box, Button, Center, Circle, Divider, Flex, Heading, HStack, Image, List, ListIcon, ListItem, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Concert, Ticket } from '@miko/share-types';
import { AiOutlineFieldTime } from '@react-icons/all-files/ai/AiOutlineFieldTime';
import { FaExpandArrowsAlt } from '@react-icons/all-files/fa/FaExpandArrowsAlt';
import AsLink from '@src/components/common/wrapChakra/AsLink';
import convertDate from '@src/helper/convertDate';
import { usePageLaravel, useSingleLaravel } from '@src/state/swr/useLaravel';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { S3_URL } from '../../../../const';

const TicketListHeader: FC<{ concert: Concert }> = ({ concert }) => {
  return (
    <Box py={4}>
      <Heading size="2xl">{concert.title}</Heading>
      <Heading size="3xl" pb={7} color="purple.400">
        Tickets
      </Heading>
      <Text fontSize="lg" fontWeight="lg">
        Artist: {concert.artist}
      </Text>
      <Text fontSize="lg" fontWeight="lg">
        Concert Date: {convertDate(concert.allConcertStartDate, 'YMDHMS')} ~ {convertDate(concert.allConcertEndDate, 'YMDHMS')}
      </Text>
    </Box>
  );
};

const TicketBox: FC<{ data: Ticket }> = ({ data }) => {
  const { archiveEndTime, concertEndDate, concertStartDate, price, runningTime, saleEndDate, saleStartDate, concertId, id } = data;

  return (
    <Box w="full">
      <Flex justifyContent="space-between" roundedTop="lg" alignItems="center" h="50px" w="full" color="white" bgColor="blackAlpha.800" pl="2">
        <Heading size="md">Ticket ID {id}</Heading>
        <AsLink to={`/my/concerts/${concertId}/admin/${id}`} pr={4}>
          <FaExpandArrowsAlt size="25px" />
        </AsLink>
      </Flex>

      <Stack
        shadow="md"
        rounded="lg"
        p={3}
        py={3}
        justifyContent={{
          base: 'flex-start',
          md: 'space-around',
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
        alignItems={{ md: 'center' }}
      >
        <Image width="300px" h="300px" fit="cover" objectPosition="center" src={S3_URL + data.concert.coverImage} alt="cover image" shadow="sm" rounded="xl" />
        <List spacing={3} textAlign="start">
          <ListItem>
            <Heading size="md">チケット販売期間</Heading>
            {convertDate(saleStartDate, 'YMDHMS')}~{convertDate(saleEndDate, 'YMDHMS')}
          </ListItem>
          <ListItem>
            <Heading size="md">コンサー公演時間</Heading>
            {convertDate(concertStartDate, 'YMDHMS')}~{convertDate(concertEndDate, 'YMDHMS')}
          </ListItem>
          <ListItem>
            <Heading size="md">アーカイブ終了日にち</Heading>
            <Text> {convertDate(archiveEndTime, 'YMDHMS')} </Text>
          </ListItem>
        </List>

        <Stack>
          <HStack>
            <Circle size="30px" bg="green.400" color="white">
              円
            </Circle>
            <Text fontSize="lg"> {price} 円</Text>
          </HStack>
          <HStack>
            <Circle size="30px" bg="orange.400" color="white">
              <AiOutlineFieldTime />
            </Circle>
            <Text fontSize="lg"> {runningTime}分</Text>
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

const TicketCardList: FC<{ tickets: Ticket[] }> = ({ tickets }) => {
  return (
    <Flex flexWrap="wrap" w="full" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
      {tickets.map(ticket => (
        <TicketBox key={ticket.id} data={ticket} />
      ))}
      <Box h="60px" />
    </Flex>
  );
};

const TicketListPage: FC = () => {
  let { concertId } = useParams();

  const { data } = usePageLaravel('/tickets', { perPage: 40, filter: [['concert_id', concertId as string]], with: ['concert'], sort: ['id'] });
  const { data: concertData } = useSingleLaravel('/concerts', parseInt(concertId as string), {});

  if (!data || !concertData) return <Box>no data</Box>;

  const tickets = data.data;
  const concert = concertData.data;

  return (
    <>
      <Helmet>
        <title>MIKO-STREAMER | {concert.title} Tickets</title>
      </Helmet>
      <Box padding="6" width="full" height="full">
        <Text> {'>'} Concert Ticket List</Text>
        <TicketListHeader concert={concert} />
        <Divider my={6} />
        <TicketCardList tickets={tickets} />
        {tickets.length == 0 && (
          <Center minH="35vh">
            <Heading>登録されたグッズがありません。</Heading>
          </Center>
        )}
      </Box>
    </>
  );
};

export default TicketListPage;
