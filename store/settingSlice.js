import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    isStop: false,
    isEffect: true,
    isSound: true,
    isExit: false,
  },
  reducers: {
    checkStop: (state, action) => {
      state.isStop = action.payload;
    },
    checkEffect: (state) => {
      state.isEffect = !state.isEffect;
    },
    checkSound: (state) => {
      state.isSound = !state.isSound;
    },
    checkIsExit: (state, action) => {
      state.isExit = action.payload;
    },
  },
});

export const { checkStop, checkEffect, checkSound, checkIsExit } =
  settingSlice.actions;
export default settingSlice.reducer;
