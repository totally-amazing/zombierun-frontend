import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    speed: 0,
    time: 0,
  },
  reducers: {
    addGameSetting: (state, action) => {
      const { speed, time } = action.payload;
      state.speed = speed;
      state.time = time;
    },
  },
});

export const { addGameSetting } = gameSlice.actions;
export default gameSlice.reducer;
