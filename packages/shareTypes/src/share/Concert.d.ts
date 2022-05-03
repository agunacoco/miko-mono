import { CommonProps } from './common';

export interface Concert extends CommonProps {
  user: number;
  updatedAt: Date;
  title: string;
  salesVolume: number;
  isPublic: boolean;
  id: number;
  detail: string;
  createdAt: Date;
  coverImage: string;
  content: string;
  categoryId: number;
  artist: string;
  allConcertStartDate: Date;
  allConcertEndDate: Date;
}

export type CreateConcertData = Pick<Concert, 'coverImage' | 'title' | 'artist' | 'detail' | 'content' | 'categoryId' | 'allConcertStartDate' | 'allConcertEndDate'>;
