import { Button, CloseButton, Flex, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { convertDate } from '@src/helper';
import { Order } from '@src/types/local';
import axios from 'axios';
import { FC, useState } from 'react';
import OrderDetail from './OrderDetail';

const OrderHistory: FC<{ orders }> = ({ orders }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState(0);
  // const [deleteOpen, setDeleteOpen] = useState(false);
  // const enterTicketData = useRecoilValue(enterTicketDataState);
  // const ref = useRef(null);
  // alert(orders);
  // function onDeleteClose() {
  //   setDeleteOpen(prev => !prev);
  // }
  function onDelete(id: number) {
    axios
      .delete(`${LARAVEL_URL}/orders/${id}`)
      // eslint-disable-next-line no-restricted-globals
      .then(() => location.reload())
      .catch(error => console.log(error));
  }
  function modalOpen() {
    setModal(prev => !prev);
  }

  function modalClose() {
    setModal(prev => !prev);
  }

  function onAlert(id: number) {
    setOrderId(id);
    console.log(orderId);
  }

  return (
    <Flex mt={'75px'} w="90%" flexDir={'column'} alignSelf={'center'}>
      <Flex w={'68%'} mb={'25px'} ml="9%" justifyContent={'space-between'}>
        <Tag size={'md'} variant="outline" colorScheme={'orange'}>
          注文番号
        </Tag>
        <Tag size={'md'} variant="outline" colorScheme={'purple'}>
          商品情報
        </Tag>
        <Tag size={'md'} variant="outline" colorScheme={'green'}>
          注文日
        </Tag>
      </Flex>
      <Flex w="90%" alignSelf={'center'} flexDir={'column'} h="54vh" overflow={'auto'}>
        {orders?.map((order: Order, key: number) => {
          return (
            <Flex alignItems={'center'} justifyContent={'space-evenly'} p={'1%'} key={key} borderBottom={'1px'} borderColor="blackAlpha.100">
              <Text fontWeight={'semibold'}>{order.id}</Text>
              <Flex w={'50%'}>
                <Flex
                  onClick={() => {
                    // onOpen();
                    modalOpen();
                    onAlert(order.id);
                  }}
                  cursor={'pointer'}
                  justifyContent={'center'}
                  background={'gray.100'}
                  w="100px"
                  h="100px"
                  alignItems="center"
                  p={'7px'}
                  borderRadius={'2xl'}
                >
                  <Flex justifyContent={'center'} bg="white" w="100%" h="100%" borderRadius={'xl'}>
                    <Image borderRadius={'md'} src={`${IMAGE_DOMAIN}${order.products[0].image}`} alt="productIamge"></Image>
                  </Flex>
                </Flex>
                <Flex w={'70%'} ml={'2%'} flexDir={'column'} justifyContent="center">
                  <Text cursor={'pointer'}>{order.products[0].name}</Text>
                  <Link style={{ textDecoration: 'none' }} href={`/concerts/${order.products[0].concert_id}`}>
                    <Text cursor={'pointer'} fontWeight={'bold'} fontSize="lg" color={'blackAlpha.500'}>
                      {order.products[0].concert_title}
                    </Text>
                  </Link>
                </Flex>
              </Flex>
              <Flex color={'blackAlpha.700'}>{convertDate(order.createdAt, 'YMD')}</Flex>
              <CloseButton onClick={() => onDelete(order.id)} color={'red.300'}></CloseButton>
              {orderId === order.id ? (
                <Modal isOpen={modal} onClose={modalClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign={'center'} fontSize={'2xl'}>
                      商品詳細
                    </ModalHeader>
                    <ModalBody>
                      <OrderDetail order={order}></OrderDetail>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="orange" mr={3} onClick={modalClose}>
                        閉じる
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              ) : null}
              {/* <AlertDialog leastDestructiveRef={ref} isOpen={deleteOpen} onClose={onDeleteClose}>
              <AlertDialogBody>
              <Flex>fa</Flex>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={ref} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => onDelete(order.id)} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialog> */}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default OrderHistory;
