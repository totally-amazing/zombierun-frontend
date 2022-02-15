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

export const getGameResult = createAsyncThunk(
  'game/getGameResultStatus',
  async (result) => {
    const { userId, mode, isWinner, time, speed, distance, role } = result;

    const mappedResult = {
      mode,
      player: {
        isWinner,
        time: Number(time),
        speed: Number(speed),
        distance,
        role,
        id: userId,
      },
    };

    if (mode === 'solo') {
      await gameService.create(mappedResult);
    } else {
      gameService.emitDie();
      await gameService.update(mappedResult.player);
    }

    return result;
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    mode: '',
    role: 'human',
    totalRecord: {},
    recentRecord: {},
    result: {},
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
    [getGameResult.fulfilled]: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;
