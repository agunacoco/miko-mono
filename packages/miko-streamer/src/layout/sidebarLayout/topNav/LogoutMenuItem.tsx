import { MenuItem } from '@chakra-ui/react';
import { isLoginState } from '@src/state/recoil/authState';
import { axiosI } from '@src/state/swr/fetcher';
import { useUser } from '@src/state/swr/useUser';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const LogoutMenuItem = () => {
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(isLoginState);
  const { mutate } = useUser();
  const logoutHandler = async () => {
    const isLogoutSuccess = await axiosI.get<boolean>('/logout');

    if (isLogoutSuccess) {
      setLogin(false);
      navigate('/');
      setTimeout(() => {
        mutate();
      }, 1000);
    }
  };

  return (
    <MenuItem bgSize="sm" onClick={logoutHandler}>
      ログアウト
    </MenuItem>
  );
};
