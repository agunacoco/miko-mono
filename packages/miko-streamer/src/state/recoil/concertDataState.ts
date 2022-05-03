import { Concert } from '@src/types/share/Concert';
import { atom } from 'recoil';

const concertDataState = atom<Concert | undefined>({
  key: 'concertData',
  default: undefined,
});

export { concertDataState };
