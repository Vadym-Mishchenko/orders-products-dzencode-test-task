import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrderState } from './types';

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    deleteOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
});

export const { setOrders, deleteOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export default orderReducer;
