import { Box, Button, Center, Container, Heading, Icon, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function HomePage() {
  let params = useParams();
  return (
    <Center w="full" h="full" position="relative">
      <Container maxW={'4xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Text fontSize="8xl" color="white" fontWeight="bold">
            MIKO-STREAMER
          </Text>
          <Text color="gray.200">
            Welcome to Miko. This website is dedicated to streamers. Streamers provide services to register and manage concerts. Discover, stream, and share a constantly expanding
            mix of concert from emerging and major artists around the world.
          </Text>
          <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
            <Link to="/login">
              <Button
                height="48px"
                width="200px"
                fontSize="20px"
                fontWeight="bold"
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                Join Membership
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Box
        w="full"
        h="full"
        aria-describedby="background image"
        backgroundImage="/image/home.jpg"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backdropBrightness="0.5"
        filter="brightness(0.3)"
        position="absolute"
        zIndex="-1"
        top="0"
        right="0"
      ></Box>
    </Center>
  );
}
