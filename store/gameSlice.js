import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    mode: '',
    role: 'human',
  },
  reducers: {
    startGame: (state, action) => {
      const { mode, role } = action.payload;
      state.mode = mode;
      state.role = role || 'human';
    },
  },
});

export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;
