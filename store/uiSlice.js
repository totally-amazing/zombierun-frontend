import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalVisible: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.isModalVisible = !state.isModalVisible;
    },
  },
});

export const { toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
