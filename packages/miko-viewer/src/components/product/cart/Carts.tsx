import { Flex, Text, Button } from '@chakra-ui/react';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { useRouter } from 'next/router';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const Carts = ({ setTabIndex, cart }) => {
  const router = useRouter();
  return (
    <Flex mt={'5%'} flexDirection={'column'} h={'70vh'} w="100%">
      {cart.length === 0 ? (
        <Flex flexDirection={'column'}>
          <Flex justifyContent={'center'}>
            <Text fontSize={'4xl'} fontWeight="bold">
              ショッピングカート
            </Text>
          </Flex>
          <Text my={'10%'} textAlign={'center'} color={'gray.300'} fontSize={'4xl'} cursor="default">
            ショッピングカートに何も入っていません。
          </Text>
          <Button w={'30%'} h="60px" rounded={'2xl'} fontSize={'xl'} mt="5%" onClick={() => router.push(`/concerts/${1}/products`)} alignSelf={'center'} colorScheme={'blue'}>
            グッズリストに移動 &nbsp;
            <FaArrowRight></FaArrowRight>
          </Button>
        </Flex>
      ) : (
        <Flex h="100%" border="2px" justifyContent={'space-around'} borderColor={'green.100'} rounded="xl">
          <Flex w={'50%'} flexDir={'column'} alignItems="center" p={'2%'}>
            <Text fontSize={'3xl'} color="green.600" fontWeight={'bold'}>
              ショッピングカート({cart.length})
            </Text>
            <CartItem cart={cart}></CartItem>
          </Flex>
          <OrderSummary setTabIndex={setTabIndex} cart={cart}></OrderSummary>
        </Flex>
      )}
    </Flex>
  );
};
export default Carts;
