import { MessageMetadata } from '@miko/share-types';
import { atom } from 'recoil';

export const msgMetaDataState = atom<MessageMetadata | undefined>({
  key: 'msgMetaDataState',
  default: undefined,
});
