import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  CSSObject,
  Flex,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import RankingCard from '../../../components/main/MainRankingCard';
import { S3_URL } from '../../../const';
import { usePageLaravel } from '../../../state/swr/useLaravel';
import { useUser } from '../../../state/swr/useUser';

const oneLine: CSSObject = {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '1.2em',
  lineHeight: '1.2',
};

const topTitles = ['MOST POPULAR', 'SECOND POPULAR', 'THIRD POPULAR'];

const RankingList: FC<{ rankingData: Concert[] }> = ({ rankingData }) => {
  return (
    <Box pt={10}>
      <HStack alignSelf="start" pt={5}>
        <Heading>Popular Concert</Heading>
        <Badge fontSize="0.9em" variant="solid" bg="purple.400">
          TOP3
        </Badge>
      </HStack>
      <Stack w="full" h="full" direction={{ base: 'column', md: 'row' }} textAlign="start" justify="center" spacing={{ base: 4, lg: 10 }} py={10}>
        <RankingCard concert={rankingData[0]} topTitle={topTitles[0]} />
        <RankingCard concert={rankingData[1]} topTitle={topTitles[1]} />
        <RankingCard concert={rankingData[2]} topTitle={topTitles[2]} />
      </Stack>
    </Box>
  );
};

const NewList: FC<{ newData: Concert[] }> = ({ newData }) => {
  return (
    <Box>
      <HStack alignSelf="start" py={10}>
        <Heading>Recently Concerts</Heading>
        <Badge fontSize="0.9em" variant="solid" colorScheme="blue">
          NEW
        </Badge>
      </HStack>
      <SimpleGrid columns={[2, null, 4]} spacing="50px">
        {newData?.map(concert => (
          <Box key={concert.id} maxW="280px">
            <SmallConcertCard concert={concert} />
          </Box>
        ))}
      </SimpleGrid>
      <Box h="100px" />
    </Box>
  );
};

const SmallConcertCard: FC<{ concert: Concert }> = ({ concert }) => (
  <Link to={`/my/concerts/${concert.id}`}>
    <a>
      <Image
        transition="all 0.2s linear"
        transitionDuration="0.2s"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        _hover={{
          transform: 'scale(1.05)',
          transitionDuration: '0.2s',
        }}
        rounded="3xl"
        w="280px"
        h="280px"
        fit="cover"
        objectPosition="center"
        src={S3_URL + concert.coverImage}
        alt="avatar"
      />
      <Box my={2}>
        <Text sx={oneLine} fontSize="xl" fontWeight="extrabold">
          {concert.title}
        </Text>
        <Text sx={oneLine} color="gray.600">
          {concert.artist}
        </Text>
      </Box>
    </a>
  </Link>
);

const CreateConcertLeadBox = () => {
  return (
    <Center w="full" h="400px" position="relative">
      <Container zIndex="1" maxW={'4xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Text fontSize="4xl" color="white" fontWeight="bold">
            MIKO-STREAMER
          </Text>
          <Text color="gray.200">
            Welcome to the Miko Streamer-only website. Streamers can register concerts, tickets, and goods. When the concert starts, you can send surveys, quizzes, and messages to
            viewers, and in the case of surveys or quizzes, we provide a service to check the results. We provide a service that allows you to manage your own concerts. First,
            register for the concert.
          </Text>

          <Link to="/my/create">
            <Button
              height="44px"
              width="200px"
              fontSize="20px"
              fontWeight="bold"
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Create Concert
            </Button>
          </Link>
        </Stack>
      </Container>
      <Box
        w="full"
        h="full"
        aria-describedby="background image"
        backgroundImage="/image/home.jpg"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        // bgPosition="center"
        backdropBrightness="0.5"
        filter="brightness(0.3)"
        position="absolute"
        top="0"
        right="0"
      ></Box>
    </Center>
  );
};

const MyPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  const { data: userData } = useUser();
  const { data: popularityData } = usePageLaravel('/concerts', userData ? { filter: [['user_id', userData.id]], sort: ['-sales_volume'], perPage: 3 } : null);
  const { data: latestData } = usePageLaravel('/concerts', userData ? { filter: [['user_id', userData.id]], perPage: 8 } : null);

  if (!popularityData || !latestData) return <Box>no data</Box>;

  const rankingData = popularityData.data;
  const newData = latestData.data;

  return (
    <>
      <Helmet>
        <title>MIKO-STREAMER | MainPage</title>
      </Helmet>
      <VStack padding="6" bgColor="white" width="full" height="full">
        <CreateConcertLeadBox />
        {/* <RankingList rankingData={rankingData} /> */}
        <NewList newData={newData} />
      </VStack>
    </>
  );
};

export default MyPage;
