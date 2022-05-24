import { User } from '@miko/share-types';

interface ChatMessageInterface {
  sender: string;
  text: string;
  amount?: number;
  itemId?: number;
  timestamp: number;
  user?: User;
}

export type { ChatMessageInterface };
