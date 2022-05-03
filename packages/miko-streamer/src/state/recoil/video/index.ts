import { atom } from 'recoil';

export const m3u8State = atom<string | undefined>({
  key: 'm3u8State',
  default: undefined,
});

export const isOnMiniPlayerState = atom({
  key: 'isOnMiniPlayerState',
  default: false,
});

export const isIvsScriptLoadedState = atom({
  key: 'isIvsScriptLoadedState',
  default: window.IVSPlayer ? true : false,
});
