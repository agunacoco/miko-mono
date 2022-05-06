import { Box, Button, Center, Flex, HStack, Icon, Input, Radio, RadioGroup, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { FcLock } from '@react-icons/all-files/fc/FcLock';
import { MdPublic } from '@react-icons/all-files/md/MdPublic';
import { USER_TICKET_COOKIE } from '@src/const';
import { convertDate, setCookie } from '@src/helper';
import { curUserTicketState, enterRoomIdState, enterTicketDataState } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const PrivateRoomIdInput = () => {
  const [roomId, setRoomId] = useRecoilState(enterRoomIdState);
  const router = useRouter();

  useEffect(() => {
    const queryRoomId = router.query?.roomId;
    if (queryRoomId) {
      setRoomId(queryRoomId as string);
    }
  }, [router.query.roomId as string]);

  const createRoomIdHandler = () => {
    setRoomId(nanoid());
  };

  return (
    <HStack>
      <Input
        errorBorderColor="white"
        focusBorderColor="orange.400"
        bgColor="purple.900"
        placeholder="Make a room ID"
        value={roomId}
        isInvalid={roomId?.length !== 21}
        contentEditable="false"
        onChange={e => setRoomId(e.target.value)}
      />
      <Button
        bgColor="orange"
        _hover={{ bg: 'orange.400' }}
        _active={{
          bg: 'orange.400',
          transform: 'scale(0.98)',
        }}
        onClick={createRoomIdHandler}
      >
        ID 生成
      </Button>
    </HStack>
  );
};

const RoomSelect = () => {
  const [radioValue, setRadioValue] = useState('private');
  const setEnterRoomId = useSetRecoilState(enterRoomIdState);
  const isPublicRoom = useMemo(() => radioValue === 'public', [radioValue]);

  const radioChangeHandler = (value: string) => {
    if (value === 'public') {
      setEnterRoomId('');
    }
    setRadioValue(value);
  };

  return (
    <Box>
      <RadioGroup value={radioValue} onChange={radioChangeHandler}>
        <Stack spacing={5} direction="row">
          <Radio colorScheme="orange" value="private">
            <HStack spacing={1}>
              <Text color="orange" fontWeight="bold">
                プライベート
              </Text>
              {radioValue == 'private' && <Icon boxSize={5} as={FcLock} />}
            </HStack>
          </Radio>
          <Radio colorScheme="blue" value="public">
            <HStack spacing={1}>
              <Text color="cyan.300" fontWeight="bold">
                ランダム
              </Text>
              {radioValue == 'public' && <Icon boxSize={5} as={MdPublic} color="cyan.400" />}
            </HStack>
          </Radio>
        </Stack>
      </RadioGroup>
      <Flex h="60px" w="full" alignItems="center">
        {isPublicRoom ? (
          <Text fontSize="lg" fontWeight="bold" color="cyan.300">
            ランダムのルームに入場します。
          </Text>
        ) : (
          <PrivateRoomIdInput />
        )}
      </Flex>
    </Box>
  );
};

const CurEnterInfo: FC = () => {
  const topBg = useColorModeValue('gray.100', 'gray.700');
  const [ticketMotion, setTicketMotion] = useState(false);

  const router = useRouter();
  useUser();
  const { concert } = useRecoilValue(curUserTicketState);
  const curTicket = useRecoilValue(enterTicketDataState);
  const [roomId, setRoomId] = useRecoilState(enterRoomIdState);

  useEffect(() => {
    if (router.isReady) {
      if (!curTicket) {
        router.push('/my/lists/1');
      }
    }
    return () => {};
  }, [router.isReady]);

  if (!curTicket || !concert) return <Box>no ticket</Box>;

  const startDate = convertDate(curTicket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const endDate = convertDate(curTicket.concertEndDate, 'YMDHM'); // 티켓 끝나는 날

  const curUserTicket = useRecoilValue(curUserTicketState);
  console.log('enter room btn', curUserTicket);
  const enterHandler = () => {
    setCookie(USER_TICKET_COOKIE, curUserTicket.id + '', 6);
    router.push('/live/viewing', '', { shallow: false });
  };

  const onClick = () => {
    setTicketMotion(true);
    setTimeout(function () {
      enterHandler();
    }, 900);
  };

  return (
    <Flex className="cardWrap" p={20}>
      <Stack
        shadow="xl"
        className="card cardLeft"
        bgPosition="40% 70%"
        bgRepeat="no-repeat"
        bgSize="150%"
        bgImage="/image/ticketbg.jpg"
        spacing={4}
        p={12}
        flex="0.7"
        color="white"
      >
        <HStack spacing={5}>
          <Text fontSize="5xl" fontWeight="bold">
            {concert.title}
          </Text>
          <Text color="yellow.400" pt={6} fontFamily="body" fontWeight="semibold" fontSize="xl">
            {concert.artist}
          </Text>
        </HStack>
        <Text className="word" color="gray.200">
          {concert.detail}
        </Text>
        <Flex w="full" borderTopWidth="1px" h="3px" borderTopColor={topBg} />
        <Text fontSize="2xl" fontWeight="semibold">
          {startDate} ~ {endDate}
        </Text>
        <RoomSelect />
      </Stack>

      <Stack
        transform={ticketMotion && 'translateX(100px) rotateZ(20deg)'}
        transitionDuration="1s"
        onClick={onClick}
        shadow="xl"
        className="card  cardRight"
        color="white"
        flex="0.3"
        p={7}
        justify="center"
        align="start"
        bg="linear-gradient( to top, purple, pink )"
      >
        {/* <Box transform="rotate(90deg)"> */}
        <Text color="cyan" fontSize="xl" fontWeight="semibold">
          {concert.artist}
        </Text>
        <Text lineHeight={10} fontSize="5xl" fontWeight="extrabold">
          {concert.title}
        </Text>
        <Text color="yellow" fontSize="2xl" fontWeight="extrabold">
          {startDate}
        </Text>
        <Box py={5}>
          <Text w="330px" color="cyan.300" fontSize="md">
            {roomId ? 'PRIVATE ROOM ID' : 'PUBLIC ROOM'}
          </Text>
          <Text w="330px" fontSize="2xl" fontWeight="bold">
            {roomId}
          </Text>
        </Box>
        <Box className="barcode"></Box>
      </Stack>

      <style>
        {`
        .word {
        display: block;
        overflow: hidden;
        white-space: normal;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        }

        .cardLeft {
          border-right: .2em dashed #fff;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .cardRight {
          border-left: .2em dashed #fff;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        } 

        .barcode {
          height: 4em;
          width: 0;
          margin: 1.2em 0 0 .8em;
          box-shadow: 1px 0 0 1px #343434,
          5px 0 0 1px #343434,
          10px 0 0 1px #343434,
          11px 0 0 1px #343434,
          15px 0 0 1px #343434,
          18px 0 0 1px #343434,
          22px 0 0 1px #343434,
          23px 0 0 1px #343434,
          26px 0 0 1px #343434,
          30px 0 0 1px #343434,
          35px 0 0 1px #343434,
          37px 0 0 1px #343434,
          41px 0 0 1px #343434,
          44px 0 0 1px #343434,
          47px 0 0 1px #343434,
          51px 0 0 1px #343434,
          56px 0 0 1px #343434,
          59px 0 0 1px #343434,
          64px 0 0 1px #343434,
          68px 0 0 1px #343434,
          72px 0 0 1px #343434,
          74px 0 0 1px #343434,
          77px 0 0 1px #343434,
          81px 0 0 1px #343434,
          85px 0 0 1px #343434,
          89px 0 0 1px #343434,
          91px 0 0 1px #343434,
          94px 0 0 1px #343434,
          97px 0 0 1px #343434,
          100px 0 0 1px #343434,
          105px 0 0 1px #343434,
          110px 0 0 1px #343434,
          111px 0 0 1px #343434,
          115px 0 0 1px #343434,
          118px 0 0 1px #343434,
          122px 0 0 1px #343434,
          123px 0 0 1px #343434,
          126px 0 0 1px #343434,
          130px 0 0 1px #343434,
          135px 0 0 1px #343434,
          137px 0 0 1px #343434,
          141px 0 0 1px #343434,
          144px 0 0 1px #343434,
          147px 0 0 1px #343434,
          151px 0 0 1px #343434,
          156px 0 0 1px #343434,
          159px 0 0 1px #343434,
          164px 0 0 1px #343434,
          168px 0 0 1px #343434,
          172px 0 0 1px #343434,
          174px 0 0 1px #343434,
          177px 0 0 1px #343434,
          181px 0 0 1px #343434,
          185px 0 0 1px #343434,
          189px 0 0 1px #343434,
          191px 0 0 1px #343434,
          194px 0 0 1px #343434,
          197px 0 0 1px #343434,
          200px 0 0 1px #343434,
          205px 0 0 1px #343434,
          210px 0 0 1px #343434,
          211px 0 0 1px #343434,
          215px 0 0 1px #343434,
          218px 0 0 1px #343434,
          222px 0 0 1px #343434,
          223px 0 0 1px #343434,
          226px 0 0 1px #343434,
          230px 0 0 1px #343434,
          235px 0 0 1px #343434,
          237px 0 0 1px #343434,
          241px 0 0 1px #343434,
          244px 0 0 1px #343434,
          247px 0 0 1px #343434,
          251px 0 0 1px #343434,
          256px 0 0 1px #343434,
          259px 0 0 1px #343434,
          264px 0 0 1px #343434,
          268px 0 0 1px #343434,
          272px 0 0 1px #343434,
          274px 0 0 1px #343434,
          277px 0 0 1px #343434,
          281px 0 0 1px #343434,
          285px 0 0 1px #343434,
          289px 0 0 1px #343434,
          291px 0 0 1px #343434,
          294px 0 0 1px #343434,
          297px 0 0 1px #343434,
          300px 0 0 1px #343434,
          305px 0 0 1px #343434,
          310px 0 0 1px #343434,
          311px 0 0 1px #343434,
          315px 0 0 1px #343434,
          318px 0 0 1px #343434,
          322px 0 0 1px #343434,
          323px 0 0 1px #343434,
          326px 0 0 1px #343434,
          330px 0 0 1px #343434,
          335px 0 0 1px #343434,
          337px 0 0 1px #343434,
          341px 0 0 1px #343434,
          344px 0 0 1px #343434,
          347px 0 0 1px #343434,
          351px 0 0 1px #343434;
        }
        `}
      </style>
    </Flex>
  );
};

const DynamicEnterPage = () => {
  return <CurEnterInfo />;
};

export default DynamicEnterPage;
