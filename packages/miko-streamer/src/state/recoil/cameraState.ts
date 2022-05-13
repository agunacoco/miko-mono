import { atom } from 'recoil';

export const cameraStreamState = atom<MediaStream | undefined>({
  key: 'myStream',
  default: undefined,
});
