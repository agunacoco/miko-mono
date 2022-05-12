// Const
export const Message = 'message';
export const Quiz = 'quiz';
export const Ranking = 'ranking';
export const Information = 'information';
export const GetChannel = 'GetChannel';
export const Sell = 'Sell';
export const Chart = 'Chart';
export const Recording = 'Recording';
export type WindowType = typeof Message | typeof Quiz | typeof Information | typeof Ranking | typeof GetChannel | typeof Sell | typeof Chart | typeof Recording;

// num
export const THUMBNAIL_INTERVAL_S = 60;

//
export const categoryArray = ['J-POP', 'K-POP', 'アニメ', 'ジャズ', 'バンド', 'バラード', '演劇', 'ロック'];
export const chType = ['チャージ', 'チケット購入', 'SC送り', 'アイテム使用', 'グッズ購入', 'チケット販売', 'グッズ販売', 'SC受け', 'アイテム受け'];
export const chChargeIdx = 0;
export const chTicketBuyIdx = 1;
export const chSuperChatSendIdx = 2;
export const chDoneItemSendIdx = 3;
export const chGoodsBuyIdx = 4;
export const chTicketSoldIdx = 5;
export const chGoodsSoldIdx = 6;
export const chSuperChatSendedIdx = 7;
export const chSuperDoneItemSendedIdx = 8;

export const S3_URL = 'https://img.mikopj.live/';

//ENV
// @ts-ignore
export const LARAVEL_URL = import.meta.env.VITE_LARAVEL_URL ?? 'http://localhost:8080/api/';
// @ts-ignore
export const NEST_URL = import.meta.env.VITE_NEST_URL ?? 'http://localhost:3001/api';
// @ts-ignore
export const SOCKET_URL = import.meta.env.VITE_SOCKET_SERVER ?? 'http://localhost:3001';

// @ts-ignore
export const S3_IVS_URL = import.meta.env.VITE_IVS_S3 as string;
