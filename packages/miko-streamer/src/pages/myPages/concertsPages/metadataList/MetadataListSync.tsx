import { Button, Flex } from '@chakra-ui/react';
import { CommonDataResponse, Ticket } from '@miko/share-types';
import { metadataState } from '@src/state/recoil/metadataState';
import { axiosI } from '@src/state/swr/fetcher';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const MetadataListSync = () => {
  const { ticketId, concertId } = useParams();
  const timeMetaData = useRecoilValue(metadataState);
  const [isLoading, setIsLoading] = useState(false);

  const handleMetadataSaveToDB = async () => {
    //   NOTE 지금 Laravel 단에서는 snakeCase로 자동 변환하는 기능이 있으므로 직렬화해서 보내야함.
    setIsLoading(true);
    axiosI.patch<CommonDataResponse<Ticket>>(`/tickets/${ticketId}`, { timeMetaData: JSON.stringify(timeMetaData) }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Flex flexDir="column">
      <Button onClick={() => handleMetadataSaveToDB()} isLoading={isLoading}>
        保存
      </Button>
    </Flex>
  );
};

export default MetadataListSync;
