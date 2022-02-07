import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showModal } = uiSlice.actions;
export default uiSlice.reducer;
