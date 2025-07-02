import { ApiProduct } from '@/features/product';

export interface ApiOrder {
  id: number;
  title: string;
  date: string;
  description: string;
  products: ApiProduct[];
}
