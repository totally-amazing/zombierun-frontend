import { createSlice } from '@reduxjs/toolkit';
import { getRecentRecord } from './gameSlice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalVisible: false,
    canHearingEffect: true,
    canHearingBGMusic: true,
    shouldExitGame: false,
    isLoading: true,
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
  extraReducers: {
    [getRecentRecord.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { toggleModal, toggleEffect, toggleSound, checkExitGame } =
  uiSlice.actions;
export default uiSlice.reducer;
