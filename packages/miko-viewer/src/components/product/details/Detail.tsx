import { Flex, Image, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { Product } from '@miko/share-types/';
import { FC } from 'react';

const Detail: FC<{ item: Product }> = ({ item }) => {
  console.log(item.detail);
  return (
    // <Flex flexDirection={"column"} alignItems={"center"}>
    // </Flex>
    // <Flex flexDirection={"column"}>
    // </Flex>
    <Flex justifyContent={'center'} flexDirection="column" alignItems={'center'}>
      <Text w={'50%'} border={'1px'} p="2%">
        {item.detail}
      </Text>
      <Image mt={'5%'} src={`${IMAGE_DOMAIN} ${item.image}`} alt="product_image"></Image>
    </Flex>
  );
};
export default Detail;
