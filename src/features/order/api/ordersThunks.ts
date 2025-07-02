import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, createOrder, deleteOrder } from './api';
import type { Order } from '@/entities';

// Загрузка заказов
export const fetchOrdersThunk = createAsyncThunk<Order[], void, { rejectValue: string }>(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      return await fetchOrders();
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch orders');
    }
  },
);

// Создание заказа
export const createOrderThunk = createAsyncThunk<
  Order,
  Omit<Order, 'id' | 'products'>,
  { rejectValue: string }
>('orders/createOrder', async (newOrder, thunkAPI) => {
  try {
    const created = await createOrder(newOrder);
    return created;
  } catch {
    return thunkAPI.rejectWithValue('Failed to create order');
  }
});

// Удаление заказа
export const deleteOrderThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'orders/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
      await deleteOrder(orderId);
      return orderId;
    } catch {
      return thunkAPI.rejectWithValue('Failed to delete order');
    }
  },
);
