import { Box, Divider, Heading, Image, Tag, Text } from '@chakra-ui/react';
import { MarkDownView } from '@src/components/markdownEditor/MarkDownView';
import { categoryArray, S3_URL } from '@src/const';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const ConcertDetailPage = () => {
  let { concertId } = useParams();

  const { data: concertData } = useSingleLaravel('/concerts', parseInt(concertId as string), {});
  if (!concertData) return <Box>Error</Box>;

  const { isPublic, id } = concertData.data;

  return (
    <Box padding="6" bgColor="white" width="full" height="full" borderRadius="lg">
      <Text> {'>'} Concert DetailPage</Text>
      <Heading as="h1">{concertData.data.title}</Heading>
      <Heading as="h2">{concertData.data.artist}</Heading>
      <Divider />
      <Text> {categoryArray[concertData.data.categoryId]}</Text>

      <Divider />
      <Box>
        <MarkDownView mdString={concertData.data.content} />
      </Box>
      <Box>
        <Text>{concertData.data.detail}</Text>
      </Box>
      <Divider />
      <motion.div transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.0 }} layoutId={'concert-image-' + id}>
        <Image width="400px" src={S3_URL + concertData.data.coverImage} alt="cover image" />
      </motion.div>
      <Tag size="md" variant="solid" colorScheme="teal">
        {isPublic ? '공개' : '비공개'}
      </Tag>
      {/* <Text>{concertData.data.user}</Text> */}
    </Box>
  );
};

export default ConcertDetailPage;
