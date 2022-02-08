import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalVisible: false,
    canHearingEffect: true,
    canHearingBGMusic: true,
    shouldExitGame: false,
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
    checkExit: (state, action) => {
      state.shouldExitGame = action.payload;
    },
  },
});

export const { toggleModal, toggleEffect, toggleSound, checkExit } =
  uiSlice.actions;
export default uiSlice.reducer;
