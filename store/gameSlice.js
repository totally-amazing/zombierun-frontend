import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import HttpClient from '../network/http';
import GameService from '../service/game';
import { createRoom, enterRoom } from './roomSlice';

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

export const updateGameResult = createAsyncThunk(
  'game/getResultStatus',
  async (game) => {
    const { gameId, userId, mode, isWinner, time, speed, distance, role } =
      game;

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
      await gameService.update(gameId, mappedResult.player);
    }

    return game;
  },
);

export const createGameRecord = createAsyncThunk(
  'game/createRecord',
  async (game) => {
    const { mode, userId } = game;
    const id = await gameService.create({
      mode,
      player: {
        isWinner: false,
        time: 0,
        speed: 0,
        distance: 0,
        role: 'human',
        id: userId,
      },
    });

    return id;
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    id: '',
    mode: '',
    role: 'human',
    totalRecord: {},
    recentRecord: {},
    result: {},
    speed: 0,
    time: 0,
  },
  reducers: {
    startGame: (state, action) => {
      state.mode = action.payload.mode;
      state.speed = Number(action.payload.speed);
      state.time = Number(action.payload.time);
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
    [updateGameResult.fulfilled]: (state, action) => {
      state.result = action.payload;
      state.id = '';
    },
    [createRoom.fulfilled]: (state, action) => {
      const { room } = action.payload;
      state.mode = room.mode;
      state.speed = room.speed;
      state.time = room.time;
    },
    [createGameRecord.fulfilled]: (state, action) => {
      state.id = action.payload;
    },
    [enterRoom]: (state, action) => {
      const { room } = action.payload;

      state.mode = room.mode;
      state.speed = room.speed;
      state.time = room.time;
    },
  },
});

export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;
