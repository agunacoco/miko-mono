import EditCommonTimeMetaData from '@src/components/adminPage/editTimeMetaData/editCommonTimeMetaData';
import { draftQuizCreatedAtState, draftQuizTagsState, draftQuizTitleState } from '@src/state/recoil/draftQuizState';
import { useRecoilState, useRecoilValue } from 'recoil';

const EditQuizCommonData = () => {
  const createdAt = useRecoilValue(draftQuizCreatedAtState);
  const tagState = useRecoilState(draftQuizTagsState);
  const title = useRecoilState(draftQuizTitleState);

  return <EditCommonTimeMetaData useTag={tagState} useTitle={title} createdAt={createdAt} />;
};

export default EditQuizCommonData;
