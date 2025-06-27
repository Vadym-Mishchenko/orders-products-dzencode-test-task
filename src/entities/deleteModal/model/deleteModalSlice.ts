import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DeleteModalState {
  isOpen: boolean;
  itemId: number | null;
  itemType: 'product' | 'order' | null;
}

const initialState: DeleteModalState = {
  isOpen: false,
  itemId: null,
  itemType: null,
};

const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState,
  reducers: {
    openDeleteModal(
      state,
      action: PayloadAction<{ itemType: DeleteModalState['itemType']; itemId: number }>,
    ) {
      state.isOpen = true;
      state.itemId = action.payload.itemId;
      state.itemType = action.payload.itemType;
    },
    closeDeleteModal(state) {
      state.isOpen = false;
      state.itemId = null;
      state.itemType = null;
    },
  },
});

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;
export const deleteModalReducer = deleteModalSlice.reducer;
export type { DeleteModalState };
