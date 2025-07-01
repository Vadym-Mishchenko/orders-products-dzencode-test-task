import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  count: number;
}

const initialState: SessionState = {
  count: 0,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setSessionCount } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
