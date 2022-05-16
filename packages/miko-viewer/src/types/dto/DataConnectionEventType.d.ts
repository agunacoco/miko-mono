import { DoneInterface } from '@miko/share-types';
import { ChatMotionInterface } from '../avatar/ChatMotionType';
import { AvatarChangeInterface, PenlightChangeInterface } from '../avatar/ModelType';
import { ChatMessageInterface } from './ChatMessageType';

interface ChatEvent {
  type: 'chat';
  data: ChatMessageInterface;
}

interface MotionEvent {
  type: 'motion';
  data: ChatMotionInterface;
}

interface UpdateScoreEvent {
  type: 'scoreUpdate';
  data: number;
}

interface DoneEvent {
  type: 'done';
  data: DoneInterface;
}

interface AvatarChangeEvent {
  type: 'avatarChange';
  data: AvatarChangeInterface;
}

interface PenlightChangeEvent {
  type: 'penlightChange';
  data: PenlightChangeInterface;
}

export type DataConnectionEvent = ChatEvent | MotionEvent | UpdateScoreEvent | DoneEvent | AvatarChangeEvent | PenlightChangeEvent;

interface SyncChatEvent {
  type: 'chat';
  data: ChatMessageInterface;
}

interface SyncMotionEvent {
  type: 'motion';
  data: ChatMessageInterface;
}

interface SyncTestEvent {
  type: 'test';
  data: string;
}

export type SyncDataConnectionEvent = SyncChatEvent | SyncMotionEvent | SyncTestEvent;
