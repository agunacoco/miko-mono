import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { enterRoomIdAsyncState, isOnAvatarState, isOnVideoAmbianceState, peerDataListState, currentAvatarState } from '@src/state/recoil';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useUser } from '@src/state/swr';
import { sendToAllPeers } from '@src/helper';
import produce from 'immer';
import { AVATAR_THEME_NAME } from '@src/const';

const ViewingSettingDrawer = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enterRoomId = useRecoilValue(enterRoomIdAsyncState);
  const peers = useRecoilValue(peerDataListState);
  const [isOnModel, setIsOnModel] = useRecoilState(isOnAvatarState);
  const [isOnVideoAmbiance, setIsOnVideoAmbiance] = useRecoilState(isOnVideoAmbianceState);
  const setCurrentAvatar = useSetRecoilState(currentAvatarState);

  const { data: user } = useUser();
  const avatarRef = useRef<HTMLSelectElement>(null);
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));
  const optionChangeHandler = () => {
    if (!(user && avatarRef.current)) return;
    const value = parseInt(avatarRef.current.value, 10);
    setCurrentAvatar(
      produce(draft => {
        /* eslint-disable */
        draft[user.uuid] = value;
      }),
    );
    sendToAllPeers(peers, { type: 'avatarChange', data: { sender: user.uuid, index: value } });
    onClose();
  };

  // useEffect(() => {
  //   const sendInterval = setInterval(() => {
  //     const setMotion = sendMotionForFrames.getMotionObject();
  //     // NOTE 모션 값이 있을 때만 발송
  //     if (setMotion && setMotion.motion) sendToAllPeers(peers, { type: 'motion', data: setMotion });
  //   }, 100);
  //   return () => {
  //     clearInterval(sendInterval);
  //   };
  // }, [peers]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay backgroundColor="transparent" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>設定</DrawerHeader>
        <DrawerBody>
          <Heading size="sm">Room Id :{enterRoomId} </Heading>
          <Divider my="6" />
          <FormControl display="flex" flexDir="column">
            <Flex justifyContent="space-between">
              <FormLabel htmlFor="is-on-model" mb="0">
                Show Avatar
              </FormLabel>
              <Switch id="is-on-model" defaultChecked={isOnModel} onChange={() => setIsOnModel(prev => !prev)} />
            </Flex>
            <Flex justifyContent="space-between">
              <FormLabel htmlFor="is-on-video-ambiance" mb="0">
                turn on video ambiance
              </FormLabel>
              <Switch id="is-on-video-ambiance" defaultChecked={isOnVideoAmbiance} onChange={() => setIsOnVideoAmbiance(prev => !prev)} />
            </Flex>
            <Divider my="6" />
            <FormControl display="flex" flexDir="column">
              <Flex justifyContent="space-between" direction="column">
                <FormLabel htmlFor="avatar-color">Change Avatar</FormLabel>
                <Select id="avatar-color" ref={avatarRef} defaultValue={0}>
                  {AVATAR_THEME_NAME.map((charName, i) => (
                    <option value={i} key={i}>
                      {charName}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>
          </FormControl>
          <Divider my="6" />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={optionChangeHandler}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

ViewingSettingDrawer.displayName = 'ViewingDrawer';

export default ViewingSettingDrawer;
