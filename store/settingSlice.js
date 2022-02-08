import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    shouldStopGame: false,
    canHearingEffect: true,
    canHearingBGMusic: true,
    shouldExitGame: false,
  },
  reducers: {
    showSetting: (state, action) => {
      state.shouldStopGame = action.payload;
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

export const { showSetting, toggleEffect, toggleSound, checkExit } =
  settingSlice.actions;
export default settingSlice.reducer;
