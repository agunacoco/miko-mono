import { Cart, Coin, Concert, Order, Product, Recording, Ticket, UserTicket } from '@miko/share-types';

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
