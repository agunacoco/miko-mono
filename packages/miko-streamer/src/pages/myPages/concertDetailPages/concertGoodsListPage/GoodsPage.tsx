import {
  Badge,
  Box,
  Center,
  chakra,
  Circle,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  SpaceProps,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Concert, Product } from '@miko/share-types';
import { BsStar } from '@react-icons/all-files/bs/BsStar';
import { BsStarFill } from '@react-icons/all-files/bs/BsStarFill';
import { BsStarHalf } from '@react-icons/all-files/bs/BsStarHalf';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';
import { RiMoneyCnyCircleLine } from '@react-icons/all-files/ri/RiMoneyCnyCircleLine';
import { usePageLaravel, useSingleLaravel } from '@src/state/swr/useLaravel';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { S3_URL } from '../../../../const';
import convertDate from '../../../../helper/convertDate';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map(tag => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor: React.FC<BlogAuthorProps> = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image borderRadius="full" boxSize="40px" src="https://100k-faces.glitch.me/random-image" alt={`Avatar of ${props.name}`} />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ProductPageHeader: FC<{ concert: Concert }> = ({ concert }) => (
  <Box py={4}>
    <Heading size="2xl">{concert.title}</Heading>
    <Heading size="3xl" pb={7} color="purple.400">
      Goods
    </Heading>
    <Text fontSize="lg" fontWeight="lg">
      Artist: {concert.artist}
    </Text>
  </Box>
);
const ProductBox: FC<{ data: Product }> = ({ data }) => {
  const { name, price, image, detail, color, createdAt } = data;

  return (
    <>
      <Wrap spacing="30px" marginTop="5" rounded="lg" border="1px" shadow="xl" borderColor="gray.100">
        <WrapItem h="full" width={{ base: '100%', sm: '45%', md: '45%', lg: '400px' }}>
          <Box w="full" h="full">
            <Box overflow="hidden" px={3}>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src={S3_URL + image}
                  alt="some text"
                  objectFit="contain"
                  width="400px"
                  height="280px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Link>
            </Box>
            <HStack alignContent="end" px={6} py={3} bg="gray.900">
              <Icon as={RiMoneyCnyCircleLine} h={6} w={6} color="white" />
              <chakra.h3 mx={3} color="white" fontWeight="bold" fontSize="md" alignSelf="start">
                {price}
              </chakra.h3>
            </HStack>
            <Box p={3}>
              <BlogTags tags={['color', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  {name}
                </Link>
              </Heading>
              <Text className="detail" as="p" fontSize="md" marginTop="2">
                {detail}
              </Text>
              <Text py={2}>{convertDate(createdAt, 'YMDHMS')}</Text>
            </Box>
          </Box>
        </WrapItem>
        <style>
          {`
        .detail {
        display: block; 
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        }
        `}
        </style>
      </Wrap>
    </>
  );
};

const ProductsCardList: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <Flex flexWrap="wrap" w="full" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
      {products.map(ticket => (
        <ProductBox key={ticket.id} data={ticket} />
      ))}
    </Flex>
  );
};
const GoodsPage = () => {
  let { concertId } = useParams();

  const { data } = usePageLaravel('/products', { perPage: 40, filter: [['concert_id', concertId as string]] });
  const { data: concertData } = useSingleLaravel('/concerts', parseInt(concertId as string), {});

  if (!data || !concertData) return <Box>no data</Box>;

  const products = data.data;
  const concert = concertData.data;

  return (
    <>
      <Helmet>
        <title>MIKO-STREAMER | {concert.title} Goods</title>
      </Helmet>
      <Box padding="6" bgColor="white" width="full" height="full">
        <Text> {'>'} Concert Goods List</Text>
        <ProductPageHeader concert={concert} />
        <Divider marginTop="5" />
        <ProductsCardList products={products} />
        {products.length == 0 && (
          <Center minH="35vh">
            <Heading>登録されたグッズがありません。</Heading>
          </Center>
        )}
      </Box>
    </>
  );
};

export default GoodsPage;
