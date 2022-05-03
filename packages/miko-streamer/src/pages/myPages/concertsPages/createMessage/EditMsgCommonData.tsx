import EditCommonTimeMetaData from '@src/components/adminPage/editTimeMetaData/editCommonTimeMetaData';
import { draftMsgCreatedAtState, draftMsgTagsState, draftMsgTitleState } from '@src/state/recoil/draftMessageState';
import { useRecoilState, useRecoilValue } from 'recoil';
//   createdAt: number;
const EditMsgCommonData = () => {
  const createdAt = useRecoilValue(draftMsgCreatedAtState);
  const tagState = useRecoilState(draftMsgTagsState);
  const title = useRecoilState(draftMsgTitleState);

  return <EditCommonTimeMetaData useTag={tagState} useTitle={title} createdAt={createdAt} />;
};

export default EditMsgCommonData;
