import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { useUser } from '@src/state/swr/useUser';
import React from 'react';

import { LogoutMenuItem } from './LogoutMenuItem';

const LoginUserInfo = () => {
  const { data } = useUser();

  if (!data) return <Box>no data</Box>;

  return (
    <HStack>
      <Avatar size={'sm'} src={data.avatar} />
      <VStack display="flex" alignItems="flex-start" spacing="1px" ml="2">
        <Text fontSize="sm">{data.name}</Text>
        <Text fontSize="xs" color="gray.600">
          {data.email}
        </Text>
      </VStack>
      <Box display="flex">
        <FiChevronDown />
      </Box>
    </HStack>
  );
};

const TopNav = () => {
  return (
    <HStack spacing={{ base: '0', md: '6' }}>
      {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <LoginUserInfo />
          </MenuButton>
          <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <LogoutMenuItem />
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default TopNav;
