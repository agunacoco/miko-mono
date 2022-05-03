import { CommonDataResponse } from '@src/types/share/common';
import { LoginData, User } from '@src/types/share/User';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { setCookie } from './../../helper/setCookie';
import { axiosI, fetcher } from './fetcher';
import laggy from './middleware/laggy';

const URL_USER = '/users';
const URL_LOGIN = '/login';
const URL_LOGOUT = '/logout';
const URL_GET_COIN = URL_USER + '/coin';
const URL_OAUTH_LOGIN = '/login/google';

export const useUser = () => {
  const aFetcher = (url: string) => {
    if (typeof window === 'undefined') return Promise.resolve(undefined);

    const isTokenExist = document.cookie.match(/^(.*;)?\s*isLogin\s*=\s*[^;]+(.*)?$/);
    console.log('여기는 useUser 로그인 토큰', isTokenExist ? ' 존재 ✅' : ' 없음. ❌');
    if (!isTokenExist) {
      // NOTE  useSWR는 undefined일 경우 suspense가 안 끝남.
      return Promise.resolve(null);
    }
    return axiosI
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        setCookie('isLogin', '', 0.0001);
        return null;
      });
  };

  const userResult = useSWRImmutable<User>(URL_USER, aFetcher, {
    errorRetryCount: 2,
    use: [laggy],
    suspense: true,
  });

  useEffect(() => {
    if (userResult.data?.uuid) {
      window.localStorage.setItem('uuid', userResult.data.uuid);
      // console.log(userResult.data);
    } else {
      window.localStorage.removeItem('uuid');
    }
  }, [userResult.data]);

  return userResult;

  // 이렇게 하면 항상 새로운 Object가 만들어짐.
  // return { data, error, mutate, isValidating, isNotLogged };
};

export const useLogin = async (loginData: LoginData) => {
  try {
    const { data } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    mutate(URL_USER, null, false);
    return false;
  }
};

export const useLogOut = async () => {
  try {
    const { data, status } = await axiosI.get(`${URL_LOGOUT}`);
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const useMyCoin = () => {
  const result = useSWR<CommonDataResponse<number>>(URL_GET_COIN, fetcher, {
    errorRetryCount: 2,
    use: [laggy],
    suspense: true,
    refreshInterval: 5000,
  });
  return result;
};
