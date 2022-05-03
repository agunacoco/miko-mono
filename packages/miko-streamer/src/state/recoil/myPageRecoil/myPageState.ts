import { atom } from 'recoil';

export const selectedConcertIdState = atom<number | undefined>({
  key: 'selectedConcertIdState',
  default: undefined,
});
