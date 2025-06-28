import type { Product } from '@/features';

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
}

export interface OrderState {
  orders: Order[];
}
