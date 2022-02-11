import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalVisible: false,
    canHearingEffect: true,
    canHearingBGMusic: true,
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
    checkExitGame: (state, action) => {
      state.shouldExitGame = action.payload;
    },
  },
});

export const { toggleModal, toggleEffect, toggleSound, checkExitGame } =
  uiSlice.actions;
export default uiSlice.reducer;
