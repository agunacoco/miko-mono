/* eslint-disable array-callback-return */
import { Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Pagination } from '@miko/share-types/src/share/common';
import { Product } from '@miko/share-types/src/share/Product';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { IMAGE_DOMAIN, NEXT_URL } from '@src/const';
import { useRouter } from 'next/router';
import { FC } from 'react';

const AllItem: FC<{ allItem: Pagination<Product> }> = ({ allItem }) => {
  const router = useRouter();
  return (
    <Flex mt={'50px'} flexDir={'column'} w={'92%'}>
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        このコンサートの他の商品
      </Text>
      <Flex>
        <SimpleGrid spacing={'230px'} columns={5}>
          {allItem.data.map((item, key) => {
            // eslint-disable-next-line eqeqeq
            if (key < 6 && !(parseInt(router.query?.product_id, 10) === item.id)) {
              return (
                <Flex
                  mt={'60px'}
                  mb="90px"
                  onClick={() => window.open(`/concerts/${router.query.id}/products/${item.id}`, '_self')}
                  cursor={'pointer'}
                  flexDirection={'column'}
                  key={key}
                >
                  <Flex boxShadow={'inner'} rounded="2xl" flexDir={'column'} w="200px" p={'15px'} _hover={{ boxShadow: '2xl' }}>
                    <Flex justifyContent="center">
                      <Flex w={'200px'} h="150px" justifyContent={'center'}>
                        <Image rounded={'xl'} src={`${IMAGE_DOMAIN}${item.image}`} alt={item.image}></Image>
                      </Flex>
                    </Flex>
                    <Text textAlign={'right'} my="7px">
                      {item.name}
                    </Text>
                    <Flex fontSize={'lg'} alignItems={'center'} justifyContent="end">
                      <Text textAlign={'right'} fontWeight={'bold'}>
                        {item.price}&nbsp;
                      </Text>
                      <FaCoins color="#FFC300"></FaCoins>
                    </Flex>
                  </Flex>
                </Flex>
              );
            }
          })}
        </SimpleGrid>
        <Flex alignItems={'end'} ml={'3%'}>
          <Button onClick={() => window.open(`${NEXT_URL}//concerts/${router.query.id}/products`, '_self')}>
            <Text fontWeight={'bold'} fontSize={'xl'}>
              全ての商品へ &#10132;
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AllItem;
