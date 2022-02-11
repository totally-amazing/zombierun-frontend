import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalVisible: false,
    canHearingEffect: false,
    canHearingBGMusic: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.isModalVisible = !state.isModalVisible;
    },
    toggleEffect: (state) => {
      state.canHearingEffect = !state.canHearingEffect;
    },
    toggleSound: (state) => {
      state.canHearingBGMusic = !state.canHearingBGMusic;
    },
  },
});

export const { toggleModal, toggleEffect, toggleSound, checkExitGame } =
  uiSlice.actions;
export default uiSlice.reducer;
