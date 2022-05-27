import { Box, Flex, Tag } from '@chakra-ui/react';
import { useMyPeer } from '@src/hooks/dynamicHooks';
import { useUser } from '@src/state/swr';
import { DataConnection } from 'peerjs';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import CleanUp from '../viewing/prepare/CleanUp';
import PreparePeerConnectToServer from '../viewing/prepare/PreparePeerConnectToServer';
import { ChatInput } from './chat/ChatInput';

const ConnectToMyPeer: FC<{ myAccountPeerId: string }> = ({ myAccountPeerId }) => {
  const myPeer = useMyPeer(myAccountPeerId + 'sync');
  const [myDataConnection, setMyDataConnection] = useState<DataConnection>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dataConnection = myPeer.connect(myAccountPeerId, { metadata: { type: 'sync' } });
    setMyDataConnection(dataConnection);
    dataConnection.on('open', () => {
      console.info('open!!!');
      setIsOpen(true);
    });

    return () => {};
  }, []);

  const sendDataToMe = useCallback(
    (data: Object) => {
      myDataConnection?.send(data);
    },
    [myDataConnection],
  );

  return (
    <Box width="full">
      {/* <SyncMotion /> */}
      <Box position="fixed" top="0" padding="1">
        <Tag colorScheme={isOpen ? 'green' : 'red'}>Sync</Tag>
      </Box>
      <ChatInput sendData={sendDataToMe} dataConnection={myDataConnection} />
    </Box>
  );
};

const SyncToMyPeer: FC<{ peerId: string }> = ({ peerId }) => {
  const syncPeerId = peerId + 'sync';
  const isExitedRef = useRef(false);
  const [isReadyPeer, setIsReadyPeer] = useState(false);

  return (
    <>
      <PreparePeerConnectToServer isExitedRef={isExitedRef} setReady={setIsReadyPeer} peerId={syncPeerId} />
      <CleanUp isExitedRef={isExitedRef} peerId={syncPeerId} />
      {isReadyPeer && <ConnectToMyPeer myAccountPeerId={peerId} />}
    </>
  );
};

export default function SyncPage() {
  const [, setData] = useState('No result');
  const { data: userData } = useUser();
  const [userPeerId, setUserPeerId] = useState<string>();
  useEffect(() => {
    setUserPeerId(userData?.uuid);
  }, [userData]);

  return (
    <Flex w="full" h="100vh" bg="blackAlpha.800" color="white" justifyContent="center" alignItems="center" flexDirection="column">
      {userPeerId ? (
        <SyncToMyPeer peerId={userPeerId} />
      ) : (
        <Box borderColor="white" border="1px" width="100vh" height="100vh" maxH="400px" maxW="400px">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setData(result?.getText());
              }

              if (error) {
                console.info(error);
              }
            }}
            scanDelay={500}
            containerStyle={{}}
            videoContainerStyle={{}}
            videoStyle={{}}
            constraints={{ facingMode: 'user' }}
          />
        </Box>
      )}
    </Flex>
  );
}
