import { Box, Button, Center, Container, Flex, SimpleGrid, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import { getPageLaravelData } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { Concert } from '@miko/share-types';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Link from 'next/link';

type Data = {
  newData: Concert[];
  topData: Concert[];
  jpopData: Concert[];
  kpopData: Concert[];
};

interface SortItemProps {
  title: string;
  subtitle: string;
  url: string;
}

const SortItems: Array<SortItemProps> = [
  { title: 'Popularity', subtitle: '人気', url: '/concerts' },
  { title: 'New', subtitle: '新着', url: '/concerts' },
  { title: 'J-POP', subtitle: '', url: '/concerts?category_id=1&page=1' },
  { title: 'K-POP', subtitle: '', url: '/concerts?category_id=2&page=1' },
];

const BuyTicketLeadBox = () => {
  return (
    <Center w="full" h="400px" position="relative">
      <Container zIndex="1" maxW={'4xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Text fontSize="4xl" color="white" fontWeight="bold">
            Welcome to the MIKO
          </Text>
          <Text color="gray.200">
            Welcome to the Miko website. Miko offers a variety of concerts, and you can watch and replay the concert in real time after purchasing. Go to the concert you want to
            see, buy a ticket, and enjoy the online streaming concert at Miko. First, please watch various concerts.
          </Text>
          <Link href="/concerts">
            <a>
              <Button
                height="44px"
                fontSize="17px"
                fontWeight="bold"
                color="white"
                bg={'teal.400'}
                rounded={'full'}
                border="none"
                px={6}
                _hover={{
                  bg: 'teal.700',
                }}
              >
                Watching the concert
              </Button>
            </a>
          </Link>
        </Stack>
      </Container>
      <Box
        w="full"
        h="full"
        aria-describedby="background image"
        backgroundImage="/image/concert.jpg"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        bgPosition="center"
        backdropBrightness="0.5"
        filter="brightness(0.3)"
        position="absolute"
        top="0"
        right="0"
      ></Box>
    </Center>
  );
};

const SortList: FC<{ data: Concert[]; sortData: SortItemProps }> = ({ data, sortData }) => {
  return (
    <Box w="full">
      <Flex py={4} mt={3} gap={3}>
        <Text fontSize="4xl" fontWeight="extrabold">
          {sortData.title}
        </Text>
        <Text pt={5} fontSize="xl" fontWeight="bold">
          {sortData.subtitle}
        </Text>
        <Spacer />
        <Link href={sortData.url}>
          <a>
            <Text pt={5} userSelect="none" color="teal.400" fontSize="xl" fontWeight="bold">
              View all
            </Text>
          </a>
        </Link>
      </Flex>
      <SimpleGrid columns={[2, null, 4]} spacing="25px">
        <ConcertList data={data} />
      </SimpleGrid>
    </Box>
  );
};

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<Data> = async () => {
  // NOTE  undefined를 구조부해 할당할려고 해서 에러 났었음.
  //  getStaticProps에 대해서는 서버 에러일때를 생각하고 에러 핸들링

  const topResultPromise = getPageLaravelData('/concerts', {
    sort: ['-sales_volume'],
    perPage: 4,
  });

  const newResultPromise = getPageLaravelData('/concerts', {
    perPage: 4,
  });

  const jpopResultPromise = getPageLaravelData('/concerts', {
    filter: [['category_id', 1]],
    perPage: 4,
  });

  const kpopResultPromise = getPageLaravelData('/concerts', {
    filter: [['category_id', 2]],
    perPage: 4,
  });

  const [newResult, topResult, jpopResult, kpopResult] = await Promise.allSettled([newResultPromise, topResultPromise, jpopResultPromise, kpopResultPromise]);

  return {
    props: {
      newData: newResult.status === 'fulfilled' ? newResult.value.data : [],
      topData: topResult.status === 'fulfilled' ? topResult.value.data : [],
      jpopData: jpopResult.status === 'fulfilled' ? jpopResult.value.data : [],
      kpopData: kpopResult.status === 'fulfilled' ? kpopResult.value.data : [],
    },
    revalidate: 60 * 10, // 10분 마다 재생성
  };
};

export default function HomePage({ newData, topData, jpopData, kpopData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title key="title">Miko - Homepage</title>
        <meta property="og:title" content="Miko" key="og:title" />
        <meta name="description" content="miko homepage, concert list" />
      </Head>
      <BuyTicketLeadBox />
      <VStack w="full" maxW="150vh" pt={6}>
        <SortList data={topData} sortData={SortItems[0]} />
        <SortList data={newData} sortData={SortItems[1]} />
        <SortList data={jpopData} sortData={SortItems[2]} />
        <SortList data={kpopData} sortData={SortItems[3]} />
      </VStack>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
