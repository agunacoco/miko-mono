import { Box, Button, Center, Divider, Flex, Heading, Tag, Text, Tooltip, useClipboard, useToast, VStack } from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import { BiCopyAlt } from '@react-icons/all-files/bi/BiCopyAlt';
import { categoryArray, NEST_URL } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { axiosI } from '@src/state/swr/fetcher';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const GridViewItem: FC<{ name: string; value: string | number }> = ({ value, name }) => {
  return (
    <Flex flexWrap="nowrap" w="full" justifyContent="space-between" px="4">
      <Heading size="md">{name} </Heading>
      <Text size="md">{value}</Text>
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

  const { allConcertEndDate, allConcertStartDate, artist, categoryId, isPublic, title } = concert as Concert;

  return (
    <Center w="full" h="full" overflowY="scroll" px="10" pt="20" flexDir="column">
      <Flex w="full" maxW="container.lg">
        <Heading size="md">コンサートチャット情報</Heading>
      </Flex>
      <Heading py="2">コンサート</Heading>
      <VStack w="full" maxW="container.lg" py="2" divider={<Divider py="1" />}>
        <GridViewItem name="タイトル" value={title} />
        <GridViewItem name="出演者" value={artist} />
        <GridViewItem name="カテゴリー" value={categoryArray[categoryId]} />
        <GridViewItem name="全公演終了時間" value={convertDate(allConcertEndDate, 'YMDHMS')} />
        <GridViewItem name="全公演開演時間" value={convertDate(allConcertStartDate, 'YMDHMS')} />
      </VStack>
      <Box h="30px" />
      <Heading py="2">チャット</Heading>
      <VStack w="full" maxW="container.lg" py="2" divider={<Divider py="1" />}>
        <GridViewItem name="ID" value={id} />
        <GridViewItem name="値段" value={price} />
        <GridViewItem name="公演時間" value={runningTime} />
        <GridViewItem name="販売終了時間" value={convertDate(saleEndDate, 'YMDHMS')} />
        <GridViewItem name="販売開始時間" value={convertDate(saleStartDate, 'YMDHMS')} />
        <GridViewItem name="公演終了時間" value={convertDate(concertEndDate, 'YMDHMS')} />
        <GridViewItem name="公演開演時間" value={convertDate(concertStartDate, 'YMDHMS')} />
        <GridViewItem name="アーカイブ閉め" value={convertDate(archiveEndTime, 'YMDHMS')} />
      </VStack>
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
      {!channelArn && <Button onClick={getKeyHandler}>Get Key</Button>}
    </Center>
  );
};

export default ConcertInformation;
