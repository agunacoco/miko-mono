import { QuizMetaData, QuizResultMetaData } from '@miko/share-types';
import { atom } from 'recoil';

export const quizMetaDataState = atom<QuizMetaData | undefined>({
  key: 'quizMetaDataState',
  default: undefined,
});

export const quizResultMetaDataState = atom<QuizResultMetaData | undefined>({
  key: 'quizResultMetaDataState',
  default: undefined,
});
