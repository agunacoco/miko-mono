import { THUMBNAIL_INTERVAL_S } from '@src/const';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const FORMAT = {
  YMD: 'YYYY/MM/DD',
  YMDHM: 'YYYY/MM/DD A hh:mm',
  YMDHMS: 'YYYY/MM/DD A hh:mm:ss',
  HMS: 'A hh:mm:ss',
  HM: 'A hh:mm',
  ISO8601NoZ: 'YYYY-MM-DDTHH:mm:ss',
  // NOTE HH를 hh로 써서 차트 데이터가 이상했음.
};

const convertDate = (data: dayjs.ConfigType, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs(data).format(FORMAT[format]);
};

export const convertDateUTC = (data: dayjs.ConfigType, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs.utc(data).format(FORMAT[format]);
};

export default convertDate;

export const roundDayJsBy30 = (aDay: dayjs.Dayjs) => {
  const m = aDay.get('m');
  if (m >= 30) {
    return aDay.set('m', 30).set('s', 0);
  } else {
    return aDay.set('m', 0).set('s', 0);
  }
};

export const getTimeOfThumb = (start: string, idx: number) => {
  return dayjs(start)
    .add(idx * THUMBNAIL_INTERVAL_S, 's')
    .format('YYYY/MM/DD A hh:mm:ss');
};
