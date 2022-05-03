import { atom, selector } from 'recoil';

const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

const loginAtom = atom<boolean>({
  key: 'isLogin',
  default: getCookieValue('isLogin') ? true : false,
});

const isLoginState = selector<boolean>({
  key: 'auth',
  get: ({ get }) => {
    return get(loginAtom);
  },
  set: ({ set }, newValue) => {
    set(loginAtom, newValue);
  },
});

export { isLoginState };
