import { CommonProps } from './common';

export interface Product extends CommonProps {
  sort: unknown;
  concertId: number;
  price: number;
  name: string;
  detail?: string;
  image: string;
  stock: number;
  color: Array;
  size: Array;
  orderLimit: number;
}

export type CreateProductData = Pick<Product, 'concertId' | 'price' | 'name' | 'detail' | 'image' | 'stock' | 'color' | 'size' | 'orderLimit'>;
