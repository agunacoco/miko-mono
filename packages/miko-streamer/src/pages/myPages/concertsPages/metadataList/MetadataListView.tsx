import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FcDoughnutChart } from '@react-icons/all-files/fc/FcDoughnutChart';
import { FiDelete } from '@react-icons/all-files/fi/FiDelete';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSend } from '@react-icons/all-files/fi/FiSend';
import { Message, Quiz } from '@src/const';
import { pushMetaData } from '@src/helper/pushMetaData';
import { draftMsgState } from '@src/state/recoil/draftMessageState';
import { draftQuizState } from '@src/state/recoil/draftQuizState';
import { metadataListFilterState, metadataState } from '@src/state/recoil/metadataState';
import { selectedWindowState } from '@src/state/recoil/selectedWindowState';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { MessageMainMetadata, MetaData, QuizMainMetadata } from '@src/types/share/TimeMetadataFormat';
import produce from 'immer';
import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import MetadataListFilter from './MetadataListFilter';
import MetadataListSync from './MetadataListSync';
import QuizChart from './QuizChart';

const MetadataMsgPreview: FC<{ data: MessageMainMetadata }> = ({ data }) => {
  return (
    <Box width="full" h="100">
      <Text>{data.mainTextData.text}</Text>
      {data.subTextData && <Text>{data.subTextData.text}</Text>}
    </Box>
  );
};

const MetadataQuizPreview: FC<{ data: QuizMainMetadata }> = ({ data }) => {
  const { choices, dataType, durationTime, mainText } = data;
  return (
    <Box width="full" h="full" padding="2">
      <Text fontSize="xl">Quiz</Text>
      <Text> {mainText} </Text>
      <Text fontSize="2xl">{data.mainText}</Text>
      {choices.map((text, idx) => (
        <Text fontSize="large" key={idx}>
          {idx + 1}.{text}{' '}
        </Text>
      ))}
    </Box>
  );
};

const MetadataPreviewContainer: FC<{ data: MetaData; pushMetaData: (channelArn: string, metadata: any) => Promise<void> }> = ({ children, data, pushMetaData }) => {
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
  const { isOpen: staticIsOpen, onOpen: staticOnOpen, onClose: staticOnClose } = useDisclosure();
  const setSelectedWindow = useSetRecoilState(selectedWindowState);
  const setDraftQuiz = useSetRecoilState(draftQuizState);
  const setDraftMsg = useSetRecoilState(draftMsgState);
  const params = useParams();
  const { data: ticketData, mutate } = useSingleLaravel('/tickets', parseInt(params.ticketId as string), {});
  const setMetadata = useSetRecoilState(metadataState);

  const handleRemoveMetadata = () => {
    setMetadata(prev =>
      produce(prev, draft => {
        const idx = draft.findIndex(d => d.createdAt === data.createdAt);
        draft.splice(idx, 1);
        return draft;
      }),
    );
  };

  const handleEditBtn = () => {
    if (data.type === 'q') {
      setDraftQuiz(data);
      setSelectedWindow(Quiz);
    }
    if (data.type === 'm') {
      setDraftMsg(data);
      setSelectedWindow(Message);
    }
  };

  console.log('ticketdata', ticketData);

  return (
    <Box width="full" position="relative" border="1px" padding="2">
      <Box>
        {children}
        <HStack>
          {data.tags.map(tag => (
            <Tag key={tag} colorScheme="teal">
              {tag}
            </Tag>
          ))}
        </HStack>
      </Box>

      <HStack position="absolute" right="0" bottom="0">
        <Text>{data.used ? '사용' : '미사용'}</Text>
        <Center onClick={handleEditBtn}>
          <FiEdit size="30px" color="#39c7bb" />
        </Center>
        <Center onClick={staticOnOpen}>
          <FcDoughnutChart size="30px" />
        </Center>
        <Center onClick={editOnOpen}>
          <FiSend size="30px" color="#2b8ceb" />
        </Center>
        <Center onClick={handleRemoveMetadata}>
          <FiDelete size="30px" color="b00020" />
        </Center>
      </HStack>

      <Modal isOpen={staticIsOpen} onClose={staticOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>결과 학인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            {data.type === 'q' && <QuizChart data={data} />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={staticOnClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={editIsOpen} onClose={editOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>데이터 전송</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>예약하기</Text>
            {ticketData && <Button onClick={() => pushMetaData(ticketData.data.channelArn, data)}>지금 보내기</Button>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editOnClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const MetadataListContainer = () => {
  const [metadata, setMetaData] = useRecoilState(metadataState);
  const metadataFilter = useRecoilValue(metadataListFilterState);

  console.log('metadata', metadata);

  const metadataDrawSwitch = (data: MetaData, idx: number) => {
    switch (data.data.dataType) {
      case 'm':
        return <MetadataMsgPreview key={idx} data={data.data} />;
      case 'q':
        return <MetadataQuizPreview key={idx} data={data.data} />;
      default:
        break;
    }
  };

  const handlePushMetaData = useCallback(
    async (channelArn: string, metadata: MetaData) => {
      const result = await pushMetaData(channelArn, metadata);

      if (result) {
        if (result.data.result.$metadata.httpStatusCode) {
          console.log('성공');
          setMetaData(prev =>
            produce(prev, draft => {
              const idx = draft.findIndex(data => (data.createdAt = metadata.createdAt));
              if (idx !== -1) {
                draft[idx].used = true;
              }
            }),
          );
        }
      }
    },
    [setMetaData],
  );

  const filteredMetadata = useMemo(() => {
    const { search, tag, used, type } = metadataFilter;

    const typeFilter = (value: MetaData) => {
      if (type === 'all') return true;
      if (type === value.type) return true;
      return false;
    };

    const usedFilter = (value: MetaData) => {
      if (used === 'all') return true;
      if (used === 'used' && value.used) return true;
      if (used === 'notUsed' && !value.used) return true;
      return false;
    };

    const tagFilter = (value: MetaData) => {
      if (tag === ' ') return true;
      if (value.tags.includes(tag)) return true;
      return false;
    };

    const searchFilter = (value: MetaData) => {
      if (search === '') return true;
      if (value.title.startsWith(search)) return true;
      return false;
    };

    return metadata.filter(typeFilter).filter(usedFilter).filter(tagFilter).filter(searchFilter);
  }, [metadata, metadataFilter]);

  return (
    <Box w="full">
      <VStack h="full">
        {filteredMetadata.map((data, idx) => {
          return (
            <MetadataPreviewContainer key={data.createdAt} data={data} pushMetaData={handlePushMetaData}>
              {metadataDrawSwitch(data, idx)}
            </MetadataPreviewContainer>
          );
        })}
      </VStack>
    </Box>
  );
};

const MetadataListView = () => {
  return (
    <VStack overflowY="scroll" h="full" w="full">
      <Heading size="md">メタデータリスト</Heading>
      <MetadataListSync />
      <MetadataListFilter />
      <MetadataListContainer></MetadataListContainer>
    </VStack>
  );
};

export default MetadataListView;
