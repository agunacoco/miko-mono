import { Concert } from '@miko/share-types';
import { atom } from 'recoil';

const concertDataState = atom<Concert | undefined>({
  key: 'concertData',
  default: undefined,
});

export { concertDataState };
