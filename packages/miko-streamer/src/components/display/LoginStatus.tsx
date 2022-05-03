import { Box, Button, HStack } from '@chakra-ui/react';
import { isLoginState } from '@src/state/recoil/authState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const LoginStatus = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [isShow, setIsShow] = useState(true);

  return (
    <HStack position="fixed" top="1" right="1" zIndex="100" bgColor="white" border="2px" width="auto">
      {isShow && (
        <Box>
          {isLogin ? 'Login!' : 'Not Login'}
          {/* <LogoutBtn /> */}
        </Box>
      )}
      <Button
        width="1"
        onClick={() => {
          setIsShow((prev) => !prev);
        }}
      ></Button>
    </HStack>
  );
};

export default LoginStatus;
