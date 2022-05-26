/* eslint-disable no-nested-ternary */
import { Button, Flex, Select, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import NewProductList from '@src/components/product/NewProductList';
import { getPageLaravelData } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { Product } from '@miko/share-types/';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ChangeEventHandler, ReactElement, useMemo, useState } from 'react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { NEXT_URL } from '../../../../const';

type Data = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = parseInt((context.query.id as string) ?? '1', 10);

  try {
    const product = await getPageLaravelData('/products', {
      filter: [['concert_id', concertId]],
    });
    return {
      props: {
        products: product.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default function ProductsPage({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [option, setOption] = useState([]);
  const [selected, setSelected] = useState<'新着順' | '売れている順' | '価格が安い順' | '価格が高い順'>('新着順');
  console.log(JSON.stringify(option));
  console.log('len = ' + option.length);
  function onDelete(id) {
    setOption(option.filter(opt => opt.product_id !== id));
  }
  function onCreate(optionList) {
    if (option.length) {
      //   // eslint-disable-next-line array-callback-return
      //   option.map(list => {
      //     if (optionList.product_id !== list.product_id) {
      //       setOption([...option, optionList]);
      //     }
      // setOption(option.filter(opt => opt.product_id !== optionList.product_id));
      setOption([optionList, ...option]);
      // console.log(JSON.stringify(option));
      console.log(JSON.stringify(option.filter(opt => opt.product_id !== optionList.product_id)));
      // setOption(option.filter(opt => opt.product_id !== optionList.product_id));
      // console.log(optionList);
      // console.log(JSON.stringify(option));
      // setOption([...option, optionList]);
      // console.log(JSON.stringify(option));
    } else {
      // } else
      // 이미 같은 상품이 들어있으면 이전 옵션을 삭제하고 넣어야 함.
      setOption([optionList, ...option]);
      // console.log(JSON.stringify(optionList));
      // console.log('b');
    }
  }
  const onSelectedChanged: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelected(e.target.value as typeof selected);
  };
  // alert(JSON.stringify(option));
  const sortedProduct = useMemo(() => {
    return products.sort((a, b) => {
      switch (selected) {
        case '新着順':
          return a.id - b.id;
        case '価格が安い順':
          return a.price - b.price;
        case '価格が高い順':
          return b.price - a.price;
        // TODO 판매순cove
        case '売れている順':
          return b.price - a.price;
        default:
          return 1;
      }
    });
  }, [selected, products]);

  const concert = useSingleLaravel('/concerts', Number(router.query.id), {});
  // alert(JSON.stringify(concert.data.data.coverImage));
  // alert(JSON.stringify(concert));
  // console.log(concert);

  let totalCoast = 0;
  if (option.length >= 1) {
    option.map(opt =>
      products.map(product => {
        if (opt.product_id === product.id) {
          totalCoast += product.price * opt.quantity;
        }
        return 1;
      }),
    );
  }
  return (
    <Flex flexDirection="column" alignItems="center" h="135vh" w="100%" boxShadow={'2xl'} rounded="2xl" p="2%" bgImage={`/image/productPage/OrderSheet.jpeg`}>
      {products.length === 0 ? (
        <Text color="gray.300" fontSize="4xl" cursor="default">
          このコンサートの賞品は用意しておりません。
        </Text>
      ) : (
        <Flex flexDirection="column" w={'100%'} h="100%" alignItems="center">
          <Text mt={'30px'} fontFamily={'fantasy'} color="blackAlpha.700" fontWeight={'bold'} fontSize="2xl" textAlign={'center'}>
            &quot;{concert.data?.data.title}&quot; GOODS
          </Text>
          <Text fontSize={'7xl'} fontFamily="fantasy">
            ORDER SHEET
          </Text>
          <Flex alignSelf="end" pr={'1%'}>
            <label htmlFor="product_sort">
              <Select
                borderColor={'#A37A41'}
                border="2px"
                _hover={{ borderColor: 'green' }}
                id="sort"
                mb="60px"
                w={'200px'}
                textAlign="center"
                size="md"
                value={selected}
                onChange={onSelectedChanged}
              >
                <option>新着順</option>
                <option>売れている順</option>
                <option>価格が安い順</option>
                <option>価格が高い順</option>
              </Select>
            </label>
          </Flex>
          {/* <Flex> */}
          {/* <ProductsList concert={concert?.data?.data} products={sortedProduct}></ProductsList> */}
          <NewProductList product={sortedProduct} onCreate={onCreate} onDelete={onDelete}></NewProductList>
          {/* </Flex> */}
          <Flex cursor={'pointer'} rounded={'2xl'} fontSize={'xl'} mt={'60px'} w={'30%'} border="2px" alignSelf={'center'}>
            <Flex
              borderTopLeftRadius={'xl'}
              borderBottomLeftRadius={'xl'}
              fontWeight={'bold'}
              alignItems={'center'}
              h={'50px'}
              justifyContent={'center'}
              bg={'black'}
              color="white"
              w={'40%'}
            >
              合計金額
            </Flex>
            <Flex w="58%" alignItems={'center'} textAlign="right" justifyContent="end">
              <Text color={'red.500'} fontWeight="bold" textAlign={'right'} justifySelf="end">
                {totalCoast}&nbsp;
              </Text>
              <FaCoins color="#FFC300"></FaCoins>
            </Flex>
          </Flex>
          {option[0] !== undefined ? (
            <Button
              rounded={'2xl'}
              fontSize={'xl'}
              borderColor={'black'}
              border={'solid'}
              mt={'10px'}
              h={'60px'}
              onClick={() => {
                window.location.href = `${NEXT_URL}/concerts/${router.query.id}/products/purchase`;
                return 1;
              }}
            >
              お会計のページへ&nbsp;<FaArrowRight></FaArrowRight>
            </Button>
          ) : null}
        </Flex>
      )}
    </Flex>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AsyncBoundary>
      <BasicLayout>{page}</BasicLayout>;
    </AsyncBoundary>
  );
};
