// import { model } from '@src/state/recoil';
import { toastLog } from '@src/helper';
import { roomMemberMotions } from '@src/state/shareObject';
import { currentAvatarState, currentPenlightState } from '@src/state/recoil';
import 'babylonjs-loaders';
import { FC, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import produce from 'immer';

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId: string;
  onAntialias?: boolean | undefined;
  isMyAvatar?: boolean | undefined;
  // eslint-disable-next-line
}> = ({ height, path, peerId, width, onAntialias, isMyAvatar }) => {
  const tagId = 'avatar' + peerId;
  const workerRef = useRef<Worker>();
  const [currentAvatar, setCurrentAvatar] = useRecoilState(currentAvatarState);
  const [penlightAvatar, setPenlightAvatar] = useRecoilState(currentPenlightState);

  useEffect(() => {
    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    worker.onerror = e => {
      toastLog('error', 'avatar worker error', '', e.error);
    };
    worker.onmessageerror = e => {
      toastLog('error', 'avatar worker message error', '');
      console.log('worker message error', e);
    };

    if ('OffscreenCanvas' in window) {
      const aCanvas = document.getElementById(tagId) as HTMLCanvasElement;
      if (!aCanvas.className) {
        aCanvas.className = 'used-canvas-one-more-time';
        const offCanvas = aCanvas.transferControlToOffscreen();

        worker.postMessage({ type: 'init', canvas: offCanvas, path, width, height, newPeerId: peerId }, [offCanvas]);
      }
    } else {
      toastLog('info', 'OffScreen Canvas 미지원 브라우저');
    }

    const avatarSettingInterval = setInterval(() => {
      const newMotionData = roomMemberMotions[peerId];
      if (newMotionData) {
        roomMemberMotions[peerId] = undefined;
        worker?.postMessage({ type: 'motionChange', thisUserMotion: newMotionData });
      }
    }, 60);

    return () => {
      worker.terminate();
      clearInterval(avatarSettingInterval);
    };
  }, []);

  useEffect(() => {
    setCurrentAvatar(
      produce(draft => {
        if (!workerRef.current) return;
        const value = draft[peerId];
        if (typeof value !== 'number') return;
        delete draft[peerId];
        workerRef.current.postMessage({ type: 'avatarChange', avatarType: value });
      }),
    );
  }, [currentAvatar]);

  useEffect(() => {
    setPenlightAvatar(
      produce(draft => {
        if (!workerRef.current) return;
        const value = draft[peerId];
        if (typeof value !== 'number') return;
        delete draft[peerId];
        workerRef.current.postMessage({ type: 'penlightChange', colorType: value });
      }),
    );
  }, [penlightAvatar]);

  return <canvas id={tagId} />;
};
