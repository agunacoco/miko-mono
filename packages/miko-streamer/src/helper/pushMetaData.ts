import { NEST_URL } from '@src/const';
import { PushMetaDataResponse } from '@src/types/aws/ivs/pushMetaDataResponse';
import axios from 'axios';

import { AllMetaData } from '../types/share/TimeMetadataFormat';

export const pushMetaData = (channelArn: string, metadata: AllMetaData) => {
  return axios
    .post<PushMetaDataResponse>(`${NEST_URL}/ivs/metadata`, {
      channelArn,
      metadata,
    })
    .catch((e) => {
      console.log(e);
    });
};
