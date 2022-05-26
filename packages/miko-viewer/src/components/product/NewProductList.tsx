import { Flex } from '@chakra-ui/react';
import { Product } from '@miko/share-types';
import ProductCard from './ProductCard';

type ProductType = {
  product: Product[];
  onCreate: Function;
  onDelete: Function;
};

export default function NewProductList({ product, onCreate, onDelete }: ProductType) {
  // const [option, setOption] = useState([{ productId: '', quantity: '', size: '', color: '' }]);
  // alert(JSON.)

  // function handleSetOpt() {
  //   setOption([...option]);
  // }

  // function handleRemove(index: number) {
  //   const list = [...option];
  //   list.splice(index, 1);
  //   setOption(list);
  // }
  // function onInputChange(e: ChangeEvent<HTMLInputElement>) {
  //   setQuantity(parseInt(e.target.value, 10));
  // }

  // function onOptionSelectId(id: number) {
  //   setOptionSelectId(id);
  // }

  return (
    <Flex rounded="2xl" flexWrap={'wrap'} w={'100%'} p="1%" h={'70%'} overflow={'auto'} justifyContent="space-between">
      {product.map((item: Product, key) => (
        <ProductCard onCreate={onCreate} onDelete={onDelete} product={item} key={key}></ProductCard>
      ))}
    </Flex>
  );
}
