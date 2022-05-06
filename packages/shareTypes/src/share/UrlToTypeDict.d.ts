import { Ticket } from './Ticket.d';
import { Product } from './Product.d';
import { Concert } from './Concert.d';
import { Coin } from './Coin.d';
import { Cart } from './Cart.d';
import { UserTicket } from './UserTicket';
import { Recording } from './Recording';

export type UrlToTypeDict = {
  '/cart_products': Cart;
  '/coin_histories': Coin;
  '/concerts': Concert;
  '/orders': Order;
  '/products': Product;
  '/tickets': Ticket;
  '/user_tickets': UserTicket;
  '/recordings': Recording;
};
