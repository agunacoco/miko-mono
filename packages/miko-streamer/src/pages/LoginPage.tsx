import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack } from '@chakra-ui/react';
import useColorStore from '@src/state/hooks/useColorStore';
import { isLoginState } from '@src/state/recoil/authState';
import { useLogin } from '@src/state/swr/useUser';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({ mode: 'all' });
  const setLoginState = useSetRecoilState(isLoginState);

  const onSubmit = async (data: any) => {
    const result = await useLogin(data);
    console.log(result);
    if (result) {
      setLoginState(true);
      navigate('/my');
    }
  };

  const fromPathname = ((location.state as any)?.from?.pathname as string) || undefined || '/';

  return (
    <>
      <Helmet>
        <title>MIKO-STREAMER | Login</title>
      </Helmet>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorStore('background')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={2}>
          <Stack align={'center'}>
            <Heading fontSize={'6xl'}>Miko Streamer</Heading>
          </Stack>
          <Box rounded="lg" bg={useColorStore('surface')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>비밀번호 찾기</Link>
                    <Link color={'blue.400'}>회원가입</Link>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    로그인
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default LoginPage;
