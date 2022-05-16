import { atom } from 'recoil';

export const currentPenlightState = atom<{ [peerId: string]: number }>({
  key: 'currentPenlight',
  default: {},
});
