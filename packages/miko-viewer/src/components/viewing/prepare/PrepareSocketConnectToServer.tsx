import { useSocket } from '@src/hooks/dynamicHooks';
import { socketErrorState } from '@src/state/recoil';
import { Dispatch, FC, SetStateAction, useEffect, useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import PrepareErrorAlert from './PrepareErrorAlert';

const PrepareSocketConnectToServer: FC<{ setReady: Dispatch<SetStateAction<boolean>> }> = ({ setReady }) => {
  const [socketError, setSocketError] = useRecoilState(socketErrorState);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on('error', error => {
      console.log(error);
      setSocketError('socket error');
    });
  }, [socket]);

  useLayoutEffect(() => {
    if (!socket) return;

    let timeoutId: NodeJS.Timeout;
    if (socket.connected) {
      setReady(true);
    } else {
      const checkSocketConnected = () => {
        if (socket.connected) {
          setReady(true);
        } else {
          timeoutId = setTimeout(checkSocketConnected, 200);
        }
      };
      timeoutId = setTimeout(checkSocketConnected);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [socket]);

  return <PrepareErrorAlert errorText={socketError} />;
};

export default PrepareSocketConnectToServer;
