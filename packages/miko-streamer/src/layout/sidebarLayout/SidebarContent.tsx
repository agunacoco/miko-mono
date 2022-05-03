import { BoxProps, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { AiOutlineShopping } from '@react-icons/all-files/ai/AiOutlineShopping';
import { FiCompass } from '@react-icons/all-files/fi/FiCompass';
import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import { FiTrendingUp } from '@react-icons/all-files/fi/FiTrendingUp';
import { IoTicketSharp } from '@react-icons/all-files/io5/IoTicketSharp';
import { IconType } from '@react-icons/all-files/lib';
import { selectedConcertIdState } from '@src/state/recoil/myPageRecoil/myPageState';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import SidebarNavItem from './SidebarNavItem';

interface LinkItemProps {
  name?: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/my/' },
  { name: '콘서트 생성', icon: FiTrendingUp, url: '/my/create' },
  { name: '회원 정보 수정', icon: FiCompass, url: '/my/edit' },
  { name: '콘서트 리스트', icon: FiStar, url: '/my/concerts' },
  { name: 'Settings', icon: FiSettings, url: '/my/' },
];

const ConcertLinkItems: Array<LinkItemProps> = [
  { icon: FiHome, url: '' }, // NOTE  "/" 안 붙여도 됨.
  { icon: AiOutlineShopping, url: '/goods' },
  { icon: IoTicketSharp, url: '/tickets' },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const selectedConcertId = useRecoilValue(selectedConcertIdState);
  let location = useLocation();
  let { concertId } = useParams();

  const isConcertDetailPage = useMemo(() => {
    const regex = /(\/my\/concerts\/)+[\d]/g;
    return location.pathname.match(regex)?.length === 1 ? true : false;
  }, [location.pathname, location]);

  return (
    <Flex h="100vh" w="fit-content" marginInlineStart="0" pr="10px">
      <VStack w="220px" m="0" bg={useColorModeValue('white', 'gray.900')} h="full" borderRightColor={useColorModeValue('gray.200', 'gray.700')}>
        <Flex alignItems="center">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </Flex>
        {LinkItems.map((link) => (
          <SidebarNavItem key={link.url} icon={link.icon} url={link.url}>
            {link.name as string}
          </SidebarNavItem>
        ))}
      </VStack>
      <VStack
        transition="0.2s ease"
        w={isConcertDetailPage ? '70px' : '0px'}
        visibility={isConcertDetailPage ? 'visible' : 'hidden'}
        h="full"
        bgColor="cyan.400"
        borderBottomRightRadius="3xl"
        justifyContent="center"
      >
        {ConcertLinkItems.map((link) => (
          <SidebarNavItem fontSize="2xl" key={link.url} icon={link.icon} url={`/my/concerts/${concertId}` + link.url}></SidebarNavItem>
        ))}
      </VStack>
    </Flex>
  );
};
export default SidebarContent;
