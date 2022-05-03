import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files/lib';
import { ReactText } from 'react';
import { Link as ReachLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children?: ReactText;
}
const SidebarNavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
  return (
    <Link
      //   href="#"
      as={ReachLink}
      to={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="16"
        gap="4"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarNavItem;
