import { axiosI } from '@src/state/fetcher';
import { LoginData, User } from '@miko/share-types';
import { useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import Cookies from 'js-cookie';
import { loginState } from '../recoil';
import laggy from './middleware/laggy';

export const URL_USER = '/users';
const URL_LOGIN = '/login';
const URL_OAUTH_LOGIN = '/login/google';
const URL_LOGOUT = '/logout';

export const useUser = () => {
  const setIsLogin = useSetRecoilState(loginState);

  const loginFetcher = (url: string) => {
    // NOTE  useSWR는 undefined일 경우 suspense가 안 끝남.
    if (typeof window === 'undefined') return Promise.resolve(null);

    const isTokenExist = Cookies.get('isLogin');
    if (!isTokenExist) {
      return Promise.resolve(null);
    }
    //  TODO 쿠키 로직 문제
    return axiosI
      .get(url)
      .then(res => res.data)
      .catch(err => {
        setIsLogin(false);
        Cookies.remove('isLogin');
        console.error(err);
        return null;
      });
  };

  const userResult = useSWRImmutable<User>(URL_USER, loginFetcher, {
    errorRetryCount: 2,
    use: [laggy],
    suspense: true,
    revalidateOnMount: false, // NOTE Message에서 마운트 되면서 전체 페이지가 리랜더링 되었음.
  });

  useEffect(() => {
    if (userResult.data?.uuid) {
      window.localStorage.setItem('uuid', userResult.data.uuid);
    } else {
      window.localStorage.removeItem('uuid');
    }
  }, [userResult.data]);

  // NOTE   shallow 비교 항상 머리속에 염두
  return userResult;
};

export const tryLogin = async (loginData: LoginData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const setLoginStatus = useSetRecoilState(loginState);
  try {
    const { data } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, true);
    // setLoginStatus(true);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const tryLogOut = async () => {
  try {
    await axiosI.get(`${URL_LOGOUT}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const tryOAuthLogin = async (token: string) => {
  try {
    const { data } = await axiosI.post<User>(`${URL_OAUTH_LOGIN}`, {
      token,
    });
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    return false;
  }
};

export const useCheckLogin = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  useLayoutEffect(() => {
    const isTokenExist = Cookies.get('isLogin');
    if (isTokenExist) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};
