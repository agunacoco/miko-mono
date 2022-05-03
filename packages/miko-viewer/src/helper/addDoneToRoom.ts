import { waitingDone } from '@src/state/shareObject/shareDoneObject';
import { DoneSendInterface } from '@miko/share-types';

export const addDoneToRoom = (data: DoneSendInterface) => {
  waitingDone[waitingDone.length] = data;
};
