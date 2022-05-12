import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
  Text,
  Tooltip,
  useClipboard,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import { BiCopyAlt } from '@react-icons/all-files/bi/BiCopyAlt';
import { GiTicket } from '@react-icons/all-files/gi/GiTicket';
import { RiMovie2Fill } from '@react-icons/all-files/ri/RiMovie2Fill';
import { categoryArray, NEST_URL, S3_URL } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { axiosI } from '@src/state/swr/fetcher';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const GridViewItem: FC<{ name: string; value: string | number }> = ({ value, name }) => {
  return (
    <Flex flexWrap="nowrap" w="full" justifyContent="space-between" px="4">
      <Text fontSize="lg" as={'span'} fontWeight={'bold'}>
        {name}
      </Text>
      <Text fontSize="lg">{value}</Text>
    </Flex>
  );
};

const KeyView: FC<{ keyName: string; tipText?: string; keyValue: string }> = ({ keyName, tipText, keyValue }) => {
  const { hasCopied, onCopy } = useClipboard(keyValue, 1500);

  return (
    <Heading display="flex" w="full" size="md" py="2" onClick={onCopy} cursor="pointer" whiteSpace="nowrap">
      <Tooltip hasArrow bg="#39c5bb" label={tipText} placement="top">
        <Tag flexShrink={0}>{keyName}</Tag>
      </Tooltip>
      {` ・ `}
      <Text isTruncated flexShrink={1}>
        {keyValue}
      </Text>
      <Box flexShrink={0} as="span" display="inline">
        <BiCopyAlt color={hasCopied ? 'red' : 'black'} />
      </Box>
    </Heading>
  );
};

const ConcertInformation: FC = () => {
  const { ticketId, concertId } = useParams();
  const toast = useToast();
  const { data: ticketData, mutate } = useSingleLaravel('/tickets', parseInt(ticketId as string), { with: ['concert'] });

  if (!ticketData) return <Box>No Ticket Data</Box>;

  const getKeyHandler = async () => {
    const { data } = await axiosI.post<Concert>('/ivs', { name: concertId + '-' + ticketId, ticketId }, { baseURL: NEST_URL, withCredentials: true });
    if (data) {
      mutate();
    } else {
      toast({
        title: 'ivs データの取得に失敗しました',
        status: 'error',
        duration: 5000,
      });
    }
    mutate();
    console.log('create channel', data);
  };

  const {
    streamKeyValue,
    streamKeyArn,
    channelArn,
    playbackUrl,
    ingestEndpoint,
    archiveEndTime,
    concertEndDate,
    concertStartDate,
    id,
    price,
    runningTime,
    saleEndDate,
    saleStartDate,
    concert,
  } = ticketData.data;

  const { allConcertEndDate, allConcertStartDate, artist, categoryId, createdAt, isPublic, detail, title, coverImage } = concert as Concert;

  return (
    <Center w="full" h="full" overflowY="scroll" px="10" pt={20}>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box h="20px" />
        <Box as={'header'}>
          <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {title}
          </Heading>
          <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize={'2xl'}>
            {artist}
          </Text>
        </Box>
        <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}>
          <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize={'xl'} fontWeight={'300'}>
            {detail}
          </Text>
          <Box>
            <Flex>
              <Text fontSize={{ base: '16px', lg: '22px' }} color={useColorModeValue('yellow.500', 'yellow.300')} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                Concert Information
              </Text>
              <Icon as={RiMovie2Fill} w={6} h={6} color={useColorModeValue('yellow.500', 'yellow.300')} />
            </Flex>
            <GridViewItem name="Concert ID" value={concert.id} />
            <GridViewItem name="タイトル" value={title} />
            <GridViewItem name="出演者" value={artist} />
            <GridViewItem name="カテゴリー" value={categoryArray[categoryId]} />
            <GridViewItem name="全公演終了時間" value={convertDate(allConcertEndDate, 'YMDHMS')} />
            <GridViewItem name="全公演開演時間" value={convertDate(allConcertStartDate, 'YMDHMS')} />
            <GridViewItem name="コンサート生成日" value={convertDate(createdAt, 'YMDHMS')} />
          </Box>
          <Box>
            <Flex>
              <Text fontSize={{ base: '16px', lg: '22px' }} color={useColorModeValue('yellow.500', 'yellow.300')} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                Ticket Information
              </Text>
              <Icon as={GiTicket} w={6} h={6} color={useColorModeValue('yellow.500', 'yellow.300')} />
            </Flex>

            <GridViewItem name="Ticket ID" value={id} />
            <GridViewItem name="値段" value={price} />
            <GridViewItem name="公演時間" value={runningTime} />
            <GridViewItem name="販売開始時間" value={convertDate(saleStartDate, 'YMDHMS')} />
            <GridViewItem name="販売終了時間" value={convertDate(saleEndDate, 'YMDHMS')} />
            <GridViewItem name="公演開演時間" value={convertDate(concertStartDate, 'YMDHMS')} />
            <GridViewItem name="公演終了時間" value={convertDate(concertEndDate, 'YMDHMS')} />
            <GridViewItem name="アーカイブ閉め" value={convertDate(archiveEndTime, 'YMDHMS')} />
          </Box>
        </Stack>
        {channelArn && (
          <Flex direction="column" w="full">
            <Heading size="lg" py="3">
              Key
            </Heading>
            <Box>
              <Heading size="sm">放送ソフトウェアに入力するキー</Heading>
              <KeyView keyName={'streamKeyValue'} keyValue={streamKeyValue} tipText="stream key" />
              <KeyView keyName={'ingestEndpoint'} keyValue={ingestEndpoint} tipText="rtmps" />
            </Box>
            <Box>
              <Heading size="sm">再生m3u8</Heading>
              <KeyView keyName={'playbackUrl'} keyValue={playbackUrl} tipText="m3u8 Url" />
            </Box>
            <Box>
              <Heading size="sm">aws arn</Heading>
              <KeyView keyName={'streamKeyArn'} keyValue={streamKeyArn} tipText="" />
              <KeyView keyName={'channelArn'} keyValue={channelArn} tipText="" />
            </Box>
          </Flex>
        )}
        {!channelArn && (
          <Button
            onClick={getKeyHandler}
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'6'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Get Key
          </Button>
        )}
        <Stack direction="row" alignItems="center" justifyContent={'center'}>
          <Text>
            ConcertID{concert.id} TicketID{id} Information
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ConcertInformation;
