import { createSlice } from '@reduxjs/toolkit';

const initialState = { open: false, message: null };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    toastMessage(state, action) {
      state.message = action.payload;
      state.open = true;
    },
    clearToast(state) {
      state.open = false;
    },
  },
});

export const { toastMessage, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
