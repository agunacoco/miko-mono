import { Box, Button, Center, Heading, HStack, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import PaginationBtn from '@src/components/button/PaginationBtn';
import { chGoodsSoldIdx, chSuperChatSendedIdx, chSuperDoneItemSendedIdx, chTicketSoldIdx, chType } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { withSuspense } from '@src/layout/withSuspenseHOC';
import { usePageLaravel, useSingleLaravel } from '@src/state/swr/useLaravel';
import { useMyCoin } from '@src/state/swr/useUser';
import { CommonFSW } from '@src/types/share/common';
import produce from 'immer';
import { ChangeEventHandler, FC, useState } from 'react';
import { useParams } from 'react-router-dom';

const ALL = -1;

const Loading = () => {
  return <Center>loding </Center>;
};

type Props = {
  query: CommonFSW;
  perPage: number;
  page: number;
  handelPageChange: (newPage: number) => void;
};

const SellHistoryDataFetch = withSuspense<Props>(({ query, page, perPage, handelPageChange }) => {
  const { data } = usePageLaravel('/coin_histories', query);

  if (!data) return <Box>Error</Box>;

  return (
    <Box>
      {data && <PaginationBtn setPage={handelPageChange} data={data.meta}></PaginationBtn>}
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>日にち</Th>
              <Th>User ID</Th>
              <Th>金額</Th>
              <Th isNumeric>タイプ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.data.map((history, idx) => {
                const { type, userId, variation, createdAt } = history;
                return (
                  <Tr key={type + perPage + page + idx + createdAt}>
                    <Td>{convertDate(createdAt, 'YMDHMS')}</Td>
                    <Td>{userId}</Td>
                    <Td>{variation}</Td>
                    <Td isNumeric>{chType[type]}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      {data && <PaginationBtn setPage={handelPageChange} data={data.meta}></PaginationBtn>}
    </Box>
  );
}, Loading);

const SellHistory: FC = () => {
  const { ticketId, concertId } = useParams<{ ticketId: string; concertId: string }>();
  const toast = useToast();
  const { data: ticketData, mutate } = useSingleLaravel('/tickets', parseInt(ticketId as string), {});
  const { data: coinData } = useMyCoin();
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(ALL);
  const [queryData, setQueryData] = useState<CommonFSW>({
    filter: [
      ['ticket_id', ticketId as string],
      ['type', type],
    ],
    perPage: perPage,
    page: page,
  });

  const handlePerPageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newPerPage = +e.target.value;
    setPage(1);
    setPerPage(newPerPage);
    setQueryData(
      produce((draft) => {
        draft.perPage = newPerPage;
        draft.page = 1;
      }),
    );
  };

  const handelPageChange = (newPage: number) => {
    setPage(newPage);
    setQueryData(
      produce((draft) => {
        draft.page = newPage;
      }),
    );
  };

  return (
    <Box px="6" pt="10" w="full" h="full" overflowY="scroll">
      <Heading size="md">販売履歴</Heading>
      <Heading> coin : {coinData?.data || 'NO COIN'}</Heading>
      <HStack aria-label="Filter controller">
        {[ALL, chTicketSoldIdx, chGoodsSoldIdx, chSuperChatSendedIdx, chSuperDoneItemSendedIdx].map((typeNum) => {
          const handlerSetType = () => {
            setType(typeNum);
            setPage(1);
            setQueryData(
              produce((draft) => {
                // @ts-ignore
                draft.filter[1][1] = typeNum;
                draft.page = 1;
              }),
            );
          };

          return (
            <Button key={typeNum} onClick={handlerSetType} colorScheme={typeNum === type ? 'red' : 'gray'}>
              {typeNum === ALL ? '全部' : chType[typeNum]}
            </Button>
          );
        })}
        <Select placeholder="Select option" defaultValue="20" onChange={handlePerPageChange} w="20">
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </Select>
      </HStack>

      <SellHistoryDataFetch query={queryData} page={page} perPage={perPage} handelPageChange={handelPageChange} />
    </Box>
  );
};

export default SellHistory;
