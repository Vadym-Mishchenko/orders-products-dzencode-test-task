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
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    deleteOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, deleteOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export default orderReducer;
