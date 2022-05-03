import { Box, Button, Center, Container, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function HomePage() {
  let params = useParams();
  return (
    <Center width="100vw" height="100vh" position="relative">
      <Container>
        <Text fontSize="8xl" color="white" fontWeight="bold">
          MIKO
        </Text>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
      </Container>
      <Box
        w="full"
        h="full"
        aria-describedby="background image"
        backgroundImage="/image/home.jpg"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backdropBrightness="0.5"
        filter="brightness(0.3) blur(3px)"
        position="absolute"
        zIndex="-1"
        top="0"
        right="0"
      ></Box>
    </Center>
  );
}
