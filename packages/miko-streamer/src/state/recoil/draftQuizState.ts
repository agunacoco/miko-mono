import { QuizMetaData } from '@miko/share-types/src/share/TimeMetadataFormat';
import { atom, DefaultValue, selector } from 'recoil';

const draftQuizDurationTimeState = atom<number>({
  key: 'draftQuizDurationTime',
  default: 30,
});

const draftQuizMainTitleState = atom<string>({
  key: 'draftQuizMainTitleState',
  default: '',
});

const draftQuizChoicesState = atom<string[]>({
  key: 'draftQuizChoices',
  default: [],
});

const draftQuizCreatedAtState = atom<number>({
  key: 'draftQuizCreatedAtState',
  default: -1,
});

const draftQuizTagsState = atom<string[]>({
  key: 'draftQuizTagsState',
  default: [],
});

const draftQuizTitleState = atom<string>({
  key: 'draftQuizTitleState',
  default: '',
});

const draftQuizUsedState = atom<boolean>({
  key: 'draftQuizUsedState',
  default: false,
});

const draftQuizState = selector<QuizMetaData>({
  key: 'draftQuiz',
  get: ({ get }) => {
    return {
      data: {
        dataType: 'q',
        mainText: get(draftQuizMainTitleState),
        durationTime: get(draftQuizDurationTimeState),
        choices: get(draftQuizChoicesState),
      },
      type: 'q',
      tags: get(draftQuizTagsState),
      title: get(draftQuizTitleState),
      createdAt: get(draftQuizCreatedAtState),
      used: get(draftQuizUsedState),
    };
  },
  set: ({ set, reset }, data) => {
    if (data instanceof DefaultValue) {
      console.log('draftQuizState selector reset', data);
      reset(draftQuizMainTitleState);
      reset(draftQuizDurationTimeState);
      reset(draftQuizChoicesState);
      reset(draftQuizTagsState);
      reset(draftQuizTitleState);
      reset(draftQuizCreatedAtState);
      reset(draftQuizUsedState);
    } else {
      set(draftQuizMainTitleState, data.data.mainText);
      set(draftQuizDurationTimeState, data.data.durationTime);
      set(draftQuizChoicesState, data.data.choices);
      set(draftQuizTagsState, data.tags);
      set(draftQuizTitleState, data.title);
      set(draftQuizCreatedAtState, data.createdAt);
      set(draftQuizUsedState, data.used);
    }
  },
});

export { draftQuizChoicesState, draftQuizCreatedAtState, draftQuizDurationTimeState, draftQuizMainTitleState, draftQuizState, draftQuizTagsState, draftQuizTitleState };
