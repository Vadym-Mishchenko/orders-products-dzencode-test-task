import { Order } from '@/entities';
import { adaptOrderFromApi, adaptOrderToApi } from '../lib';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE}/orders`);
  if (!response.ok) throw new Error('Failed to fetch orders');

  const data = await response.json();
  return data.map(adaptOrderFromApi);
};

export const createOrder = async (order: Omit<Order, 'id' | 'products'>): Promise<Order> => {
  const payload = adaptOrderToApi(order);

  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to create order');

  const data = await response.json();
  return adaptOrderFromApi(data);
};

export const deleteOrder = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete order');

  return response.json();
};
