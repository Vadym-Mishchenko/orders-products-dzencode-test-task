import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '@/entities';
import { createOrderThunk, deleteOrderThunk, fetchOrdersThunk } from '@/features';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // загрузка заказов
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch orders';
      })

      // создание заказов
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create order';
      })

      // удаление заказов
      .addCase(deleteOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete order';
      });
  },
});

export const orderReducer = orderSlice.reducer;
export default orderReducer;
