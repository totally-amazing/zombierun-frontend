import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import HttpClient from '../network/http';
import GameService from '../service/game';

const httpClient = new HttpClient(BASE_URL);
const gameService = new GameService(httpClient);

export const getTotalRecord = createAsyncThunk(
  'game/getTotalRecordStatus',
  async (userId) => {
    const totalRecord = await gameService.getTotalRecord(userId);
    return totalRecord;
  },
);

export const getRecentRecord = createAsyncThunk(
  'game/getRecentRecordStatus',
  async (userId) => {
    const recentRecord = await gameService.getRecentRecord(userId);
    return recentRecord;
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    mode: '',
    role: 'human',
    totalRecord: {},
    recentRecord: {},
  },
  reducers: {
    startGame: (state, action) => {
      const { mode, role } = action.payload;
      state.mode = mode;
      state.role = role || 'human';
    },
  },
  extraReducers: {
    [getTotalRecord.fulfilled]: (state, action) => {
      const { time } = action.payload;
      state.totalRecord = {
        ...action.payload,
        time: {
          hour: time && Math.floor(time / 60),
          minute: time && time % 60,
        },
      };
    },
    [getRecentRecord.fulfilled]: (state, action) => {
      state.recentRecord = action.payload;
    },
  },
});

export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;
