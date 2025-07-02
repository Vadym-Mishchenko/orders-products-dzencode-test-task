import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders as fetchOrdersApi } from '@/features';
import type { Order } from '@/entities';

export const fetchOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      return await fetchOrdersApi();
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch orders');
    }
  },
);
