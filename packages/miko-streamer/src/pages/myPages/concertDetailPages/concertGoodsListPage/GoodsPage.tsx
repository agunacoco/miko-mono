import { Box, Text } from '@chakra-ui/react';
import { Product } from '@miko/share-types';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProductBox: FC<{ data: Product }> = ({ data }) => {
  const { name } = data;

  return <Box>{name}</Box>;
};

const GoodsPage = () => {
  let { concertId } = useParams();

  const { data } = usePageLaravel('/products', { perPage: 40, filter: [['concert_id', concertId as string]] });

  if (!data) return <Box>no data</Box>;

  const products = data.data;

  return (
    <Box style={{ padding: '1rem 0' }} bgColor="white" width="full" height="full">
      <Text>登録されているグッズ</Text>
      {products.map(ticket => (
        <ProductBox key={ticket.id} data={ticket} />
      ))}
    </Box>
  );
};

export default GoodsPage;
