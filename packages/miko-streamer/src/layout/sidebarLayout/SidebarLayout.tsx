import { Box, Flex, FlexProps, IconButton, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';

import SidebarContent from './SidebarContent';
import TopNav from './topNav/TopNav';

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* @ts-ignore */}
      <AnimateSharedLayout>
        <AnimatePresence>
          <Flex w="100vw" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} />
            <VStack flexGrow={1} maxH="100vh" overflowX="scroll">
              <MobileNav onOpen={onOpen} />
              <Box width="full" height="full">
                <Outlet />
              </Box>
            </VStack>
          </Flex>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      w="full"
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />
      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      <TopNav />
    </Flex>
  );
};
