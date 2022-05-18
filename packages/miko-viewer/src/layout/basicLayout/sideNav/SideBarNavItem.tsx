import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files/lib';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface LinkItemProps {
  name: string;
  icon?: IconType;
  url?: string;
}

export interface NavItemProps extends FlexProps {
  link: LinkItemProps;
}

export const SideBarNavItem = ({ link, ...rest }: NavItemProps) => {
  const router = useRouter();
  const { icon, url } = link;
  const nowPath = router.pathname as string;

  const Content = () => (
    <Flex
      align="center"
      p="4"
      borderRadius="base"
      role="group"
      cursor="pointer"
      _hover={{
        color: '#39c5bb',
      }}
      bg={nowPath == url && 'cyan.50'}
      color={nowPath == url && '#39c5bb'}
      userSelect="none"
      position="relative"
      onHover
      className="SideBarNavItem"
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: '#39c5bb',
          }}
          as={icon}
        />
      )}
      {link.name}
      {nowPath === url && <Box position="absolute" w="2" h="14" borderLeftRadius="base" backgroundColor="#39c5bb" left="0" />}
    </Flex>
  );

  if (url)
    return (
      <Link href={url}>
        <a>
          <Content />
        </a>
      </Link>
    );

  return <Content />;
};
