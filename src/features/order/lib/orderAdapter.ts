import { adaptProductFromApi } from '@/features';
import { Order } from '@/entities';
import type { ApiOrder } from '../model/types';

export const adaptOrderFromApi = (api: ApiOrder): Order => ({
  id: api.id,
  title: api.title,
  date: api.date,
  description: api.description,
  products: api.products?.map(adaptProductFromApi) || [],
});

export const adaptOrderToApi = (
  order: Omit<Order, 'id' | 'products'>,
): Omit<ApiOrder, 'id' | 'products'> => ({
  title: order.title,
  date: order.date,
  description: order.description,
});
