import { useBeforeunload } from '@src/hooks';
import { SingletonPeer, SingletonSocket } from '@src/hooks/dynamicHooks';
import { ivsErrorState, mediapipeErrorState, myStreamState, peerErrorState, socketErrorState } from '@src/state/recoil';
import { FC, MutableRefObject, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

const CleanUp: FC<{ isExitedRef: MutableRefObject<boolean>; peerId?: string }> = ({ isExitedRef }) => {
  const setMediapipeError = useSetRecoilState(mediapipeErrorState);
  const setSocketError = useSetRecoilState(socketErrorState);
  const setPeerError = useSetRecoilState(peerErrorState);
  const setIvsError = useSetRecoilState(ivsErrorState);
  const myStream = useRecoilValue(myStreamState);
  const resetMyStreamRecoil = useResetRecoilState(myStreamState);

  const handleCleanUp = () => {
    console.log('handleCleanUp');
    // eslint-disable-next-line no-param-reassign
    isExitedRef.current = true;

    if (myStream) {
      myStream.getTracks().forEach(track => {
        track.stop();
        myStream.removeTrack(track);
      });
      resetMyStreamRecoil();
    }

    SingletonSocket.destroy();
    SingletonPeer.destroy();

    setMediapipeError(undefined);
    setSocketError(undefined);
    setPeerError(undefined);
    setIvsError(undefined);
  };

  // 창이 닫힐때
  useBeforeunload(() => {
    handleCleanUp();
  });

  // 뒤로 갈때
  useEffect(() => {
    return () => {
      handleCleanUp();
    };
  }, []);

  return <></>;
};

export default CleanUp;
