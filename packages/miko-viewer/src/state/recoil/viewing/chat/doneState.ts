import { DoneSendInterface } from '@miko/share-types';
import { atom } from 'recoil';

const doneState = atom<{ data: DoneSendInterface; x: number; y: number }[]>({
  key: 'doneState',
  default: [],
});

export { doneState };
