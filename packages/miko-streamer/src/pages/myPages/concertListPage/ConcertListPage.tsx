import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, chakra, Flex, Heading, Icon, Image, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { MdMusicNote } from '@react-icons/all-files/md/MdMusicNote';
import { MdSchedule } from '@react-icons/all-files/md/MdSchedule';
import AsLink from '@src/components/common/wrapChakra/AsLink';
import { S3_URL } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { useUser } from '@src/state/swr/useUser';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const CategoryCard: FC<{ concert: Concert[] }> = ({ concert }) => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="40px">
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
    </SimpleGrid>
  );
};

const ConcertCard: FC<{ data: Concert }> = ({ data }) => {
  const startDate = convertDate(data.allConcertStartDate, 'YMDHM');
  const endDate = convertDate(data.allConcertEndDate, 'YMDHM');

  return (
    <AsLink to={`/my/concerts/${data.id}`}>
      <Box
        w="370px"
        // mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        borderRadius="15px"
        transition="all 0.2s linear"
        transitionDuration="0.2s"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 10px"
        _hover={{
          transform: 'scale(1.04)',
          transitionDuration: '0.2s',
          shadow: '2xl',
        }}
      >
        <motion.div transition={{ duration: 0 }} layoutId={'concert-image-' + data.id}>
          <Image w="full" h={56} fit="cover" objectPosition="center" src={S3_URL + data.coverImage} alt="avatar" />
        </motion.div>

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={MdSchedule} h={6} w={6} color="white" />

          <VStack flexGrow={1}>
            <chakra.h3 mx={3} color="white" fontWeight="bold" fontSize="md" alignSelf="start">
              {startDate} ~
            </chakra.h3>
            <chakra.h3 mx={3} color="white" fontWeight="bold" fontSize="md" alignSelf="end">
              {endDate}
            </chakra.h3>
          </VStack>
        </Flex>

        <Box py={4} px={6}>
          <chakra.h1 className="oneLine" fontSize="2xl" fontWeight="extrabold" color={useColorModeValue('gray.800', 'white')}>
            {data.title}
          </chakra.h1>
          <Heading size="sm">ID: {data.id}</Heading>
          <chakra.p my={3} className="detail" color={useColorModeValue('gray.700', 'gray.400')}>
            {data.detail}
          </chakra.p>

          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdMusicNote} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm" className="oneLine">
              {data.artist}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
      <style>
        {`
        .oneLine {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          height: 1.3em;
          line-height: 1.2;
          -webkit-box-orient: vertical;
        }
        .detail {
        display: block; 
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2 ;
        -webkit-box-orient: vertical;
        }
        `}
      </style>
    </AsLink>
  );
};

const ConcertCardList: FC = () => {
  const { data: userData } = useUser();
  const { data } = usePageLaravel('/concerts', userData ? { filter: [['user_id', userData.id]] } : null);

  return (
    <Flex flexWrap="wrap" w="full" flexDirection="row" alignItems="center" justifyContent="center" gap="30px">
      {data?.data.map(data => (
        <ConcertCard key={data.id} data={data} />
      ))}
      <Box h="60px" />
    </Flex>
  );
};

const ConcertListPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  return (
    <VStack spacing={20} padding="6" bgColor="white" width="full" height="full">
      <Heading size="2xl">All Concerts</Heading>
      <ConcertCardList />
    </VStack>
  );
};

export default ConcertListPage;
