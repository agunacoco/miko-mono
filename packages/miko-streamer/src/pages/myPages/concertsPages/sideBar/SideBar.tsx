import { Center, VStack } from '@chakra-ui/react';
import { Chart, Information, Message, Quiz, Ranking, Recording, Sell, WindowType } from '@src/const';
import { selectedWindowState } from '@src/state/recoil/selectedWindowState';
import { FC, ReactElement } from 'react';
import { useRecoilState } from 'recoil';

// @ts-ignore
import ChartLogo from './chart.svg?component';
// @ts-ignore
import InformationLogo from './information.svg?component';
// @ts-ignore
import MessageLogo from './message.svg?component';
// @ts-ignore
import QuizLogo from './quiz.svg?component';
// @ts-ignore
import RankingLogo from './ranking.svg?component';
// @ts-ignore
import SellLogo from './sell.svg?component';

const IconWrapper: FC<{ type: WindowType; children: ReactElement }> = ({ type, children }) => {
  const [selectedWindow, setSelectedWindow] = useRecoilState(selectedWindowState);

  const handleChangeWindow = () => {
    setSelectedWindow(type);
  };

  return (
    <Center w="full" h="full" onClick={handleChangeWindow} bgColor={type === selectedWindow ? 'blue.100' : '#FFFFFF00'} p="2">
      {children}
    </Center>
  );
};

const SideBar = () => {
  return (
    <VStack pt="2">
      <IconWrapper type={Quiz}>
        <QuizLogo />
      </IconWrapper>
      <IconWrapper type={Message}>
        <MessageLogo />
      </IconWrapper>
      <IconWrapper type={Information}>
        <InformationLogo />
      </IconWrapper>
      <IconWrapper type={Ranking}>
        <RankingLogo />
      </IconWrapper>
      <IconWrapper type={Sell}>
        <SellLogo />
      </IconWrapper>
      <IconWrapper type={Chart}>
        <ChartLogo />
      </IconWrapper>
      <IconWrapper type={Recording}>
        <ChartLogo />
      </IconWrapper>
    </VStack>
  );
};

export default SideBar;
