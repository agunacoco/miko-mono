import { CoinHistory, Concert, Ticket, UserTicket } from '@src/types/share';
import { CommonDataResponse, CommonFindId, CommonFSW, Pagination } from '@src/types/share/common';
import { Recording } from '@src/types/share/Recording';
import useSWR, { SWRConfiguration } from 'swr';

import { Product } from './../../types/share/Product';
import { fetcher } from './fetcher';
import { createFSWQueryString } from './helper/createQueryStringKey';
import laggy from './middleware/laggy';

// query를 주지 않으면 null이 반환됨, 빈 오브젝트 {}라도 반드시 줘야함.
// CSR에 필요한 query 데이터가 필요한 경우가 있어서 이렇게 설계함.

type DataTypeDict = {
  '/concerts': Concert;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
  '/coin_histories': CoinHistory;
  '/products': Product;
  '/chats': any;
  '/orders': any;
  '/order_products': any;
  '/recordings': Recording;
};

export const usePageLaravel = <K extends keyof DataTypeDict, T = DataTypeDict[K], PT = Pagination<T>>(url: K, query: CommonFSW | null, option?: SWRConfiguration<PT>) => {
  let aUrl = url + '?';
  aUrl += query ? createFSWQueryString(query) : '';

  return useSWR<PT>(query ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};

export const useSingleLaravel = <K extends keyof DataTypeDict, T = DataTypeDict[K], CT = CommonDataResponse<T>>(
  url: K,
  id: number,
  query: CommonFindId | null,
  option?: SWRConfiguration<CT>,
) => {
  let aUrl = `${url}/${id}?`;
  aUrl += query ? createFSWQueryString(query) : '';

  return useSWR<CT>(query ? aUrl : null, fetcher, {
    suspense: true,
    use: [laggy],
    ...option,
  });
};
