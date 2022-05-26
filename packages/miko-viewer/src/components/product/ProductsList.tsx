import { Flex, Image, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { Product, Concert } from '@miko/share-types';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { IMAGE_DOMAIN } from '@src/const';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ProductsList: FC<{ products: Product[]; concert: Concert }> = ({ products }) => {
  const router = useRouter();
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  return (
    <SimpleGrid columns={isLargerThan960 ? 4 : 2} spacing={70}>
      {products.map((item, id) => (
        <Link key={id} href={`/concerts/${router.query.id}/products/${item.id}`}>
          <a>
            {/* <Flex justifyItems={'center'}> */}
            <Flex flexDir={'column'} alignItems="center" rounded="2xl" _hover={{ boxShadow: '2xl' }} p={'3%'}>
              {/* <Flex p={'2%'} bg="blackAlpha.200" rounded="2xl"> */}
              <Flex justifyContent={'center'} w={'200px'} h="200px" bg={'white'}>
                <Image h="200px" src={`${IMAGE_DOMAIN} ${item.image}`} rounded="2xl" alt={item.name}></Image>
              </Flex>
              {/* </Flex> */}
              <Text my={'10px'} textAlign={'right'}>
                {item.name}
              </Text>
              <Flex alignSelf={'end'} alignItems="center">
                <Text fontSize="lg" fontWeight={'bold'}>
                  {item.price}&nbsp;
                </Text>
                <FaCoins fontSize={'lg'} color="#FFC300"></FaCoins>
              </Flex>
            </Flex>
            {/* </Flex> */}
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
