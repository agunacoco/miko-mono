import { atom } from 'recoil';

const screenImageState = atom<string | undefined>({
  key: 'screenImage',
  default: undefined,
});

export { screenImageState };
