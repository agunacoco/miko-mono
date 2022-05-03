import { Message, WindowType } from '@src/const';
import { atom } from 'recoil';

const selectedWindowState = atom<WindowType>({
  key: 'selectedWindow',
  default: Message,
});

export { selectedWindowState };
