import { Badge, Box, Center, Divider, Flex, Heading, HStack, Image, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import { MarkDownView } from '@src/components/markdownEditor/MarkDownView';
import { categoryArray, S3_URL } from '@src/const';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import convertDate from '../../../../helper/convertDate';

const ConcertDetailCard: FC<{ concert: Concert }> = ({ concert }) => {
  console.log(concert);
  return (
    <Box width="full" height="full">
      <HStack spacing={4} pt={5}>
        <Heading as="h1" size="2xl">
          {concert.title}
        </Heading>
        <Text alignSelf="end" fontSize="xl">
          {concert.artist}
        </Text>
        <Tag pt={1} size="lg" variant="solid" colorScheme="teal">
          {concert.isPublic ? '공개' : '비공개'}
        </Tag>
      </HStack>
      <Divider mt={5} />
      <Flex gap={2} justify="end" my={2}>
        <Text>Registration Date</Text>
        <Text>{convertDate(concert.createdAt, 'YMDHMS')}</Text>
      </Flex>
      <motion.div transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.0 }} layoutId={'concert-image-' + concert.id}>
        <Image width="400px" src={S3_URL + concert.coverImage} alt="cover image" shadow="sm" rounded="2xl" />
      </motion.div>

      <Divider my={5} />
      <Text fontWeight="550" fontSize="2xl" color="orange.400" mb={3}>
        CONCERT DETAILS
      </Text>
      <Flex gap={4}>
        <Heading size="sm">Category:</Heading>
        <Badge fontSize="md" px={2} variant="solid" colorScheme="purple">
          {categoryArray[concert.categoryId - 1]}
        </Badge>
      </Flex>
      <Flex gap={4}>
        <Heading size="sm">ID:</Heading>
        <Text>{concert.id}</Text>
      </Flex>
      <Flex gap={4}>
        <Heading size="sm">Concert Date:</Heading>
        <Text>
          {convertDate(concert.allConcertStartDate, 'YMDHMS')} ~ {convertDate(concert.allConcertEndDate, 'YMDHMS')}
        </Text>
      </Flex>
      <Flex gap={4}>
        <Heading size="sm">Detail:</Heading>
        <Text>{concert.detail}</Text>
      </Flex>
      <Flex gap={4}>
        <Heading size="sm">Content:</Heading>
        <Text>{concert.content}</Text>
        {/* <MarkDownView mdString={concertData.data.content} /> */}
      </Flex>
      <Box h="60px" />
    </Box>
  );
};

const ConcertDetailPage = () => {
  let { concertId } = useParams();

  const { data } = useSingleLaravel('/concerts', parseInt(concertId as string), {});
  if (!data) return <Box>Error</Box>;

  const concert = data.data;

  return (
    <Box padding="6" bgColor="white" width="full" height="full">
      <Text> {'>'} Concert Detail Page</Text>
      <ConcertDetailCard concert={concert} />
    </Box>
  );
};

export default ConcertDetailPage;
