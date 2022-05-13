import { Message, WindowType } from '@src/const';
import { atom } from 'recoil';

import { localStorageEffect } from './effects';

const selectedWindowState = atom<WindowType>({
  key: 'selectedWindow',
  default: Message,
  effects: [localStorageEffect('selectedWindow')],
});

export { selectedWindowState };
