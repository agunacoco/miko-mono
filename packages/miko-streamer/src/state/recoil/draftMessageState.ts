import { MessageMainMetadata, MessageMetadata } from '@miko/share-types';
import { atom, DefaultValue, selector } from 'recoil';

const draftMsgBoxDataState = atom<MessageMainMetadata['boxData']>({
  key: 'draftMsgBoxData',
  default: {
    width: 200,
    height: 100,
    round: 10,
    padding: 10,
    spacing: 10,
    hexColor: '#FFFFFFFF',
  },
});

const initMsgMainTextData = {
  text: '',
  size: 20,
  bold: 600,
  font: 'serif',
  hexColor: '#111111FF',
};

const draftMsgMainTextState = atom<MessageMainMetadata['mainTextData']>({
  key: 'draftMsgMainText',
  default: initMsgMainTextData,
});

const draftMsgSubTextState = atom<MessageMainMetadata['subTextData']>({
  key: 'draftMsgSubText',
  default: initMsgMainTextData,
});

const draftMsgPositionState = atom<MessageMainMetadata['positionIndex']>({
  key: 'draftPosition',
  default: 1,
});

const draftMsgUrlState = atom<MessageMainMetadata['urlString']>({
  key: 'draftUrl',
  default: undefined,
});

const draftMsgAnimationTypeState = atom<MessageMainMetadata['animationType']>({
  key: 'draftMsgAnimationTypeState',
  default: undefined,
});

const draftMsgTimeDurationState = atom<MessageMainMetadata['durationTime']>({
  key: 'draftTimeDuration',
  default: 5,
});

// const draftMsg123State = atom<MessageMetadata['']>({
//   key: 'draft123',
//   default: undefined,
// });
// const draftMessageState = atom<MessageMetadata>({
//   key: 'draftMessage',
//   default: initMessageMetadata,
// });

const draftMsgIsHasSubTextState = selector<boolean>({
  key: 'draftMsgIsHasSubText',
  get: ({ get }) => {
    return !!get(draftMsgSubTextState);
  },
});

const draftMsgCreatedAtState = atom<number>({
  key: 'draftMsgCreatedAtState',
  default: -1,
});

const draftMsgTagsState = atom<string[]>({
  key: 'draftMsgTagsState',
  default: [],
});

const draftMsgTitleState = atom<string>({
  key: 'draftMsgTitleState',
  default: '',
});

const draftMsgUsedState = atom<boolean>({
  key: 'draftMsgUsedState',
  default: false,
});

const draftMsgState = selector<MessageMetadata>({
  key: 'draftMessage',
  get: ({ get }) => {
    console.log('draftMessage', get(draftMsgTagsState));
    return {
      data: {
        dataType: 'm',
        boxData: get(draftMsgBoxDataState),
        positionIndex: get(draftMsgPositionState),
        mainTextData: get(draftMsgMainTextState),
        subTextData: get(draftMsgSubTextState),
        urlString: get(draftMsgUrlState),
        animationType: get(draftMsgAnimationTypeState),
        durationTime: get(draftMsgTimeDurationState),
      },
      type: 'm',
      createdAt: get(draftMsgCreatedAtState),
      tags: get(draftMsgTagsState),
      title: get(draftMsgTitleState),
      used: get(draftMsgUsedState),
    };
  },
  set: ({ set, reset }, data) => {
    if (data instanceof DefaultValue) {
      reset(draftMsgBoxDataState);
      reset(draftMsgPositionState);
      reset(draftMsgMainTextState);
      reset(draftMsgSubTextState);
      reset(draftMsgUrlState);
      reset(draftMsgAnimationTypeState);
      reset(draftMsgTimeDurationState);
      reset(draftMsgCreatedAtState);
      reset(draftMsgTagsState);
      reset(draftMsgTitleState);
      reset(draftMsgUsedState);
    } else {
      set(draftMsgBoxDataState, data.data.boxData);
      set(draftMsgPositionState, data.data.positionIndex);
      set(draftMsgMainTextState, data.data.mainTextData);
      set(draftMsgSubTextState, data.data.subTextData);
      set(draftMsgUrlState, data.data.urlString);
      set(draftMsgAnimationTypeState, data.data.animationType);
      set(draftMsgTimeDurationState, data.data.durationTime);
      set(draftMsgCreatedAtState, data.createdAt);
      set(draftMsgTagsState, data.tags);
      set(draftMsgTitleState, data.title);
      set(draftMsgUsedState, data.used);
    }
  },
});

export {
  draftMsgAnimationTypeState,
  draftMsgBoxDataState,
  draftMsgCreatedAtState,
  draftMsgIsHasSubTextState,
  draftMsgMainTextState,
  draftMsgPositionState,
  draftMsgState,
  draftMsgSubTextState,
  draftMsgTagsState,
  draftMsgTimeDurationState,
  draftMsgTitleState,
  draftMsgUrlState,
};
