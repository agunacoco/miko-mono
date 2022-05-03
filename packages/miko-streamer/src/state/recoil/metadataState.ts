import { MetaData, MetadataType } from '@src/types/share/TimeMetadataFormat';
import { atom, selector } from 'recoil';

//  "" 일때 필터 작동 안함.
export const metadataListFilterSearchState = atom({
  key: 'metadataListFilterSearchState',
  default: '',
});

//  " " 일때 필터 작동 안함.
export const metadataListFilterTagState = atom({
  key: 'metadataListFilterTagState',
  default: ' ',
});

export const metadataListFilterUsedState = atom<'all' | 'used' | 'notUsed'>({
  key: 'metadataListFilterUsedState',
  default: 'all',
});

export const metadataListFilterTypeState = atom<'all' | MetadataType>({
  key: 'metadataListFilterTypeState',
  default: 'all',
});

export const metadataListFilterState = selector({
  key: 'metadataListFilterState',
  get: ({ get }) => {
    return {
      type: get(metadataListFilterTypeState),
      search: get(metadataListFilterSearchState),
      tag: get(metadataListFilterTagState),
      used: get(metadataListFilterUsedState),
    };
  },
});

export const metadataState = atom<Array<MetaData>>({
  key: 'metadataState',
  default: [],
});

export const metadataTagListState = selector({
  key: 'metadataTagListState',
  get: ({ get }) => {
    const metadataList = get(metadataState);
    const tagSet = new Set<string>();

    metadataList.forEach((metadata) => {
      metadata.tags.forEach((tag) => {
        console.log('tag', tag);
        tagSet.add(tag);
      });
    });
    console.log('set', tagSet);

    return Array.from(tagSet);
  },
});
