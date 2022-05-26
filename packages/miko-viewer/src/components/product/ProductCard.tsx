import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter,
  Button,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { GiCheckMark } from '@react-icons/all-files/gi/GiCheckMark';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';
import styles from '@src/style/css/order.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IMAGE_DOMAIN, LARAVEL_URL } from '../../const';
import { axiosI } from '../../state/fetcher';
import { useUser } from '../../state/swr';

export default function ProductCard({ product, onCreate, onDelete }) {
  const toast = useToast();
  const [quantityValue, setQuantityValue] = useState(0);
  // options[0].quantity = quantityValue;
  // alert(JSON.stringify(options[0].quantity));
  const [sizeValue, setSizeValue] = useState('');
  const [colorValue, setColorValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [setOptions, setSetOptions] = useState(false);
  const optionList = { product_id: product.id, size: sizeValue, quantity: quantityValue, color: colorValue };
  // options = [...option];
  // let flexStyle = styles.flex;

  const { data: userData } = useUser();

  function onCart() {
    axios
      .post(
        `${LARAVEL_URL}/cart_products`,
        {
          user_id: userData?.id,
          size: sizeValue,
          color: colorValue,
          product_id: optionList.product_id,
          quantity: quantityValue,
        },
        // { withCredentials: true },
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  function resetOptions() {
    setQuantityValue(0);
    setSizeValue('');
    setColorValue('');
  }
  function deleteOptions(id) {
    resetOptions();
    onDelete(id);
    axiosI.delete(`${LARAVEL_URL}/cart_products/${id}`).then(res => console.log(res.data));
    // setSetOptions(false);
    // alert(id);
    // console.log(id);
  }
  // // if (setOptions) alert(JSON.stringify(optionList));
  useEffect(() => {
    if (setOptions) {
      onCreate(optionList);
      // resetOptions();
    }
  }, [setOptions]);
  return (
    <Flex w={'47%'} rounded="2xl" mb={'5%'}>
      {/* <Flex w={'8%'} flexDir="column" fontSize={'2xl'} mt="3%">
        <Flex bg="blackAlpha.500" borderLeftRadius={'2xl'} justifyContent='center' alignItems="center" opacity={'90%'} flexDir="column" h={'60px'}>
          {product.id}
        </Flex>
      </Flex> */}
      {setOptions && sizeValue !== '' ? (
        <Flex fontSize="lg" color="white" className={styles.flex} flexDir={'column'} mt="3%" w="8%">
          <Flex
            cursor={'pointer'}
            h={'60px'}
            // w={'8%'}
            justifyContent="center"
            alignItems={'center'}
            // h="30%"
            bg="green.500"
            borderLeftRadius={'2xl'}
            opacity={'80%'}
            flexDir="column"
          >
            <GiCheckMark></GiCheckMark>
          </Flex>
          <Flex
            cursor={'pointer'}
            mt="10px"
            h={'60px'}
            // w={'8%'}
            justifyContent="center"
            alignItems={'center'}
            // h="30%"
            bg="red.500"
            borderLeftRadius={'2xl'}
            opacity={'80%'}
            flexDir="column"
          >
            {/* <FaShoppingCart color="white"></FaShoppingCart> */}
            <IoIosClose onClick={() => deleteOptions(product.id)} size={'lg'}></IoIosClose>
          </Flex>
        </Flex>
      ) : null}
      <Flex
        flexDir={'column'}
        w="40%"
        alignItems={'center'}
        border="solid"
        rounded={'2xl'}
        borderRight="none"
        borderTopRightRadius={'none'}
        borderBottomRightRadius="none"
        borderColor={'blackAlpha.400'}
      >
        <Flex justifyContent={'center'} p={'2%'} h={'200px'}>
          <Image borderRadius={'2xl'} src={`${IMAGE_DOMAIN}${product.image}`} alt="productImage"></Image>
          {/* </Flex> */}
        </Flex>
        <Flex alignItems="center" justifyContent={'center'} borderBottomLeftRadius={'2xl'} w="full" h={'27%'} textAlign={'center'} flexDir={'column'} bg={'blackAlpha.200'}>
          <Flex justifyContent={'center'}>{product.name}</Flex>
          <Flex color={'red.500'} fontWeight="bold" borderBottomLeftRadius="2xl" justifyContent="center" alignItems={'center'}>
            {product.price}&nbsp;
            <FaCoins color="#FFC300"></FaCoins>
          </Flex>
        </Flex>
      </Flex>
      {product.orderLimit ? (
        <Flex w={'30px'} h="100%" bg={'#F14C4C'} justifyContent="center" alignItems="center">
          <Text w={'50%'} fontWeight={'bold'} color={'white'} fontSize="sm">
            お一人様<span style={{ marginLeft: '3px' }}>1</span>合計<span style={{ marginLeft: '3px' }}>{product.orderLimit}</span>点まで
          </Text>
        </Flex>
      ) : (
        <Flex w={'35px'} h="100%" bg={'blackAlpha.400'} fontSize="sm" justifyContent="center" alignItems="center">
          <Text w={'50%'} fontWeight={'bold'} color={'white'}>
            購入制限ありません！
          </Text>
        </Flex>
      )}
      <Flex bg={'whiteAlpha.400'} flexDir={'column'} w={'24%'} h={'100%'} alignItems="center" alignSelf={'center'} fontSize={'28px'}>
        <Flex w={'full'} textAlign="center" justifyContent={'center'} h={'33%'} borderRight="2px" borderTop={'2px'} borderBottom={'2px'} alignItems="center">
          数量
        </Flex>
        <Flex w={'full'} h={'33%'} borderRight="2px" borderBottom={'2px'} justifyContent={'center'} alignItems="center">
          カラー
        </Flex>
        <Flex w={'full'} h={'34%'} borderRight="2px" borderBottom={'2px'} justifyContent={'center'} alignItems="center">
          サイズ
        </Flex>
      </Flex>
      <Flex
        onClick={() => {
          onOpen();
          setSetOptions(false);
        }}
        cursor="pointer"
        bg={'whiteAlpha.400'}
        flexDir={'column'}
        w={'32%'}
        h={'100%'}
        alignItems="center"
        alignSelf={'center'}
      >
        <Flex
          w={'full'}
          roundedTopRight="xl"
          textAlign="center"
          justifyContent={'center'}
          h={'33%'}
          borderRight="2px"
          borderTop={'2px'}
          borderBottom={'2px'}
          alignItems="center"
          fontSize={'3xl'}
        >
          {setOptions && quantityValue !== 0 ? (
            <svg viewBox="0 0 150 70">
              <text className={styles.text} x="50%" y="65%" textAnchor="middle">
                {quantityValue}
              </text>
            </svg>
          ) : null}
        </Flex>
        <Flex w={'full'} borderRight="2px" h={'33%'} borderBottom={'2px'} justifyContent={'center'} alignItems="center" fontSize={'3xl'}>
          {setOptions ? (
            <svg viewBox="0 0 180 70">
              <text className={styles.text} x="50%" y="65%" textAnchor="middle">
                {colorValue.toUpperCase()}
              </text>
            </svg>
          ) : null}
        </Flex>
        <Flex w={'full'} borderRight="2px" borderBottom={'2px'} roundedBottomRight="xl" h={'34%'} justifyContent={'center'} alignItems="center" fontSize={'3xl'}>
          {setOptions ? (
            <svg viewBox="0 0 180 70">
              <text className={styles.text} x="50%" y="65%" textAnchor="middle">
                {sizeValue}
              </text>
            </svg>
          ) : null}
        </Flex>
      </Flex>
      {/* {optionSelectId === product.id ? ( */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>オプション選択</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select mb={'6%'} placeholder="数量" onChange={e => setQuantityValue(parseInt(e.target.value, 10))} value={quantityValue}>
              {[...Array(product.stock)].map((count: number, index: number) => {
                if (index < product.orderLimit) {
                  return <option key={index}>{index + 1}</option>;
                }
                if (!product.orderLimit) return <option key={index}>{index + 1}</option>;
                return 1;
              })}
            </Select>
            <Select mb={'6%'} placeholder="カラー" value={colorValue} onChange={e => setColorValue(e.target.value)}>
              {JSON.parse(product.color).map((value: string, index: number) => {
                return <option key={index}>{value}</option>;
              })}
            </Select>
            <Select mb={'6%'} placeholder="サイズ" value={sizeValue} onChange={e => setSizeValue(e.target.value)}>
              {JSON.parse(product.size).map((value: string, index: number) => {
                return <option key={index}>{value}</option>;
              })}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme={'green'}
              onClick={() => {
                onClose();
                setSetOptions(true);
                onCart();
                toast({
                  title: 'オプション選択が完了しました。',
                  // description: 'オプション選択',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                  position: 'bottom-right',
                });
              }}
            >
              決定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* ) : null} */}
    </Flex>
  );
}
