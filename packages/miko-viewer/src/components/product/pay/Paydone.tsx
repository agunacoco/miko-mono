import { Button, Flex, Link, Table, TableCaption, TableContainer, Tbody, Td, Text } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { NEXT_URL } from '@src/const';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { useRouter } from 'next/router';

const Paydone = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const orders = useSingleLaravel('/orders', userData?.id, {});
  const orderLen: any = orders.data.length;
  const order = orders?.data[orderLen - 1];
  return (
    <Flex flexDir={'column'}>
      <Text fontSize={'3xl'} textAlign={'center'} my={'10%'}>
        ありがとうございます。ご注文手続きが完了しました。
      </Text>
      <TableContainer alignSelf={'center'} w={'100%'}>
        <Table mb={'15%'}>
          <TableCaption mt={'80px'} textAlign={'left'}>
            会員様は、会員メニュー内の
            <Link color="blue.500" href="#">
              「お買い物リスト」
            </Link>
            からもご確認いただけます。
            <br></br>
            <br></br>お申し込み内容メールの再送をご希望される場合には、 <br></br>
            あ問い合わせフォームより件名を「お申し込み内容確認メールの再送希望」としてご連絡をお願いいたします。
          </TableCaption>
          <Tbody>
            <Td>ご注文番号</Td>
            <Td textAlign={'center'}>
              <Text as="u">{order.id}</Text>
            </Td>
          </Tbody>
          <Tbody>
            <Td>お支払い総額(コイン)</Td>
            <Td textAlign={'center'} color="#EE5338">
              <Flex justifyContent={'center'} alignItems="center">
                {order.total_price}&nbsp;
                <FaCoins color="#FFC300" />
              </Flex>
            </Td>
          </Tbody>
          <Tbody>
            <Td>今回のお買い物のポイント</Td>
            <Td textAlign={'center'}>{order.total_price * 0.05}P</Td>
          </Tbody>
          <Tbody>
            <Td>ご注文履歴</Td>
            <Td textAlign={'center'}>
              <Link color="blue.500" href="/my/order">
                ご注文履歴
              </Link>
            </Td>
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => window.open(`${NEXT_URL}/concerts/${router.query.id}/products`, '_self')} alignSelf={'center'} w="30%">
        ショッピングを続く
      </Button>
    </Flex>
  );
};
export default Paydone;
