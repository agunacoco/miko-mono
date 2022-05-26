import { CloseButton, Flex, Image, Tag, TagLabel, Text } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { Cart } from '@src/types/local';
import { FC } from 'react';
import { axiosI } from '../../../state/fetcher';

const CartItem: FC<{ cart: Cart }> = ({ cart }) => {
  function deleteCart(productId: number) {
    axiosI
      .delete(`${LARAVEL_URL}/cart_products/${productId}`)
      // eslint-disable-next-line no-restricted-globals
      .then(() => location.reload())
      .catch(error => console.log(error));
  }
  return (
    <Flex background={'whiteAlpha.600'} rounded="2xl" p={'1%'} flexDir={'column'} mt="8%" alignSelf="center" w="120%" h="100%" overflow={'auto'}>
      {cart
        ? cart.map((item: Cart, key: number) => {
            return (
              <Flex p={'2%'} alignItems={'center'} borderRadius={'2xl'} shadow="lg" key={key} mb="7%" justifyContent={'space-evenly'} w={'100%'}>
                <Image w="100px" h="100px" src={`${IMAGE_DOMAIN}${item.products[0].image}`} rounded={'30%'} alt="productImage"></Image>
                <Flex w={'30%'} flexDirection={'column'}>
                  <Text>{item.products[0].name}</Text>
                  <Tag
                    mt={'4%'}
                    alignSelf={'end'}
                    justifyContent={'center'}
                    textAlign="center"
                    colorScheme={`${item.color.toLowerCase()}`}
                    color={`${item.color.toLowerCase()}.500`}
                  >
                    <TagLabel textAlign={'center'} fontSize={'sm'}>
                      {item.color}
                    </TagLabel>
                  </Tag>
                  <Tag mt={'2%'} justifyContent={'center'} variant="outline" alignSelf={'end'} color={'blackAlpha.700'}>
                    <TagLabel fontWeight={'bold'} fontSize={'sm'}>
                      {item.size}
                    </TagLabel>
                  </Tag>
                </Flex>
                <Flex w={'14%'} justifyContent={'center'} alignItems="center">
                  {/* {item.quantity === 1 ? (
                    <Text fontWeight="bold">{item.quantity}点</Text>
                  ) : ( */}
                  <Text fontWeight="bold">
                    {item.products[0].price}&nbsp;X&nbsp;{item.quantity}点
                  </Text>
                  {/* )} */}
                </Flex>
                <Flex w={'10%'} justifyContent={'center'} alignItems="center">
                  <Text as="u">{item.quantity * item.products[0].price}</Text>
                  &nbsp;
                  <FaCoins color="#FFC300" />
                </Flex>
                <Flex ml={'3%'} justifyContent={'center'} alignItems="center">
                  <CloseButton color={'red.300'} onClick={() => deleteCart(item.product_id)}></CloseButton>
                </Flex>
              </Flex>
            );
          })
        : null}
    </Flex>
  );
};
export default CartItem;
