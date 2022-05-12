import { Button, HStack, Input } from '@chakra-ui/react';
import { enterRoomIdState } from '@src/state/recoil';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const PrivateRoomIdInput = () => {
  const [roomId, setRoomId] = useRecoilState(enterRoomIdState);
  const router = useRouter();

  useEffect(() => {
    const queryRoomId = router.query?.roomId;
    if (queryRoomId) {
      setRoomId(queryRoomId as string);
    }
  }, [router.isReady]);

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
