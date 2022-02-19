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

export const createGameResult = createAsyncThunk(
  'game/createResultStatus',
  async (game) => {
    const { userId, mode, isWinner, time, speed, distance, role } = game;

    const mappedResult = {
      mode,
      player: {
        isWinner,
        time: Number(time),
        speed: Number(speed),
        distance: Number(distance),
        role,
        id: userId,
      },
    };

    await gameService.create(mappedResult);

    return game;
  },
);

export const updateGameRecord = createAsyncThunk(
  'game/updateRecordStatus',
  async (game) => {
    const { gameId, userId, isWinner, time, speed, distance, role } = game;

    const player = {
      isWinner,
      time: Number(time),
      speed: Number(speed),
      distance: Number(distance),
      role,
      id: userId,
    };

    await gameService.update(gameId, player);

    return game;
  },
);

export const createGameRecord = createAsyncThunk(
  'game/createRecordStatus',
  async (game) => {
    const { mode, userId, role = 'human' } = game;
    const id = await gameService.create({
      mode,
      player: {
        isWinner: false,
        time: 0,
        speed: 0,
        distance: 0,
        role,
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
    switchRole: (state, action) => {
      state.role = action.payload;
    },
    startGame: (state, action) => {
      state.id = action.payload.id;
      state.mode = action.payload.mode;
      state.speed = Number(action.payload.speed);
      state.time = Number(action.payload.time);
    },
    initGame: (state, action) => {
      state.id = '';
      state.mode = '';
      state.role = 'human';
      state.totalRecord = {};
      state.recentRecord = {};
      state.result = {};
      state.speed = 0;
      state.time = 0;
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
    [updateGameRecord.fulfilled]: (state, action) => {
      state.result = action.payload;
      state.id = '';
    },
    [createGameResult.fulfilled]: (state, action) => {
      state.result = action.payload;
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
      state.mode = action.payload.room.mode;

      if (state.mode === 'oneOnOne') {
        state.role = 'zombie';
      }
    },
  },
});

export const { startGame, switchRole, initGame } = gameSlice.actions;
export default gameSlice.reducer;
