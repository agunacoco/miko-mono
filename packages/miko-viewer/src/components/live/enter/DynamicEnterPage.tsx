import { Box, Flex } from '@chakra-ui/react';
import { curUserTicketState, enterTicketDataState } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import TicketLeftPart from './ticket/TicketLeftPart';
import TicketRightPart from './ticket/TicketRightPart';

const DynamicEnterPage: FC = () => {
  const { data: userData } = useUser();

  const router = useRouter();
  const { concert } = useRecoilValue(curUserTicketState);
  const curTicket = useRecoilValue(enterTicketDataState);

  useEffect(() => {
    if (router.isReady) {
      if (!curTicket) {
        router.push('/my/lists/1');
      }
    }
    return () => {};
  }, [router.isReady]);

  if (!curTicket || !concert) return <Box>no ticket</Box>;

  return (
    <Flex className="cardWrap" p={20}>
      <TicketLeftPart />
      <TicketRightPart />
    </Flex>
  );
};

export default DynamicEnterPage;
