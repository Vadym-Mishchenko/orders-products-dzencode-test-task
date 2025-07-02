import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrderState } from './types';
import { fetchOrders } from '@/features/order/api/ordersThunks';

interface ExtendedOrderState extends OrderState {
  loading: boolean;
  error: string | null;
}

const initialState: ExtendedOrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    deleteOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch orders';
      });
  },
});

export const { setOrders, addOrder, deleteOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export default orderReducer;
