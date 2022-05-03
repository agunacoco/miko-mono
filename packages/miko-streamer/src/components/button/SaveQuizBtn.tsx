import { Button } from '@chakra-ui/react';
import { draftQuizState } from '@src/state/recoil/draftQuizState';
import { metadataState } from '@src/state/recoil/metadataState';
import { MetaData } from '@src/types/share/TimeMetadataFormat';
import produce from 'immer';
import { FC } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const SaveMetaDataBtn: FC<{ savedMetaData: MetaData }> = ({ savedMetaData }) => {
  //   const savedMetaData = useRecoilValue(draftQuizState);
  const setMetadata = useSetRecoilState(metadataState);
  const resetDraftQuiz = useResetRecoilState(draftQuizState);
  const handleSaveQuiz = () => {
    const isNewMetaData = savedMetaData.createdAt === -1;

    setMetadata(prev =>
      produce(prev, draft => {
        if (isNewMetaData) {
          draft.push({ ...savedMetaData, createdAt: Date.now() });
        } else {
          // Edit으로 불러온 데이터
          const idx = draft.findIndex(v => v.createdAt === savedMetaData.createdAt);
          draft[idx] = savedMetaData;
        }
      }),
    );

    if (!isNewMetaData) {
      if (savedMetaData.type === 'q') resetDraftQuiz();
    }
  };

  return (
    <Button onClick={handleSaveQuiz} colorScheme="teal">
      保存
    </Button>
  );
};

export default SaveMetaDataBtn;
