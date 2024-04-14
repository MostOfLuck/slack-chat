/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const modalWindowAdapter = createEntityAdapter();
const initialState = modalWindowAdapter.getInitialState({
  isOpen: false,
  type: null,
  relevantChannel: null,
});

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openModalWindow: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.relevantChannel = payload.relevantChannel;
    },

    closeModalWindow: (state) => {
      state.isOpen = false;
      state.type = null;
      state.relevantChannel = null;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalWindowSlice.actions;
export { modalWindowAdapter };
export default modalWindowSlice.reducer;
