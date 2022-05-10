import { Box, Flex, HStack, Icon, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { FcLock } from '@react-icons/all-files/fc/FcLock';
import { MdPublic } from '@react-icons/all-files/md/MdPublic';
import { enterRoomIdState } from '@src/state/recoil';
import React, { useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PrivateRoomIdInput } from './PrivateRoomIdInput';

export const RoomSelect = () => {
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
              {radioValue === 'private' && <Icon boxSize={5} as={FcLock} />}
            </HStack>
          </Radio>
          <Radio colorScheme="blue" value="public">
            <HStack spacing={1}>
              <Text color="cyan.300" fontWeight="bold">
                ランダム
              </Text>
              {radioValue === 'public' && <Icon boxSize={5} as={MdPublic} color="cyan.400" />}
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
