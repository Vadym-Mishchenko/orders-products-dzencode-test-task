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
    removeProductFromOrder(state, action: PayloadAction<{ orderId: number; productId: number }>) {
      const { orderId, productId } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.products = order.products.filter(
          (product: { id: number }) => product.id !== productId,
        );
      }
    },
  },
});

export const { setOrders, deleteOrder, removeProductFromOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export default orderReducer;
