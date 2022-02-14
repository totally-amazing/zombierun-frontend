import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Socket from '../network/socket';
import HttpClient from '../network/http';
import RoomService from '../service/room';

const socket = new Socket(BASE_URL);
const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient, socket);

export const getRooms = createAsyncThunk('room/getRoomsStatus', async () => {
  const roomList = await roomService.getRooms();
  return roomList;
});

export const createRoom = createAsyncThunk(
  'room/createRoomStatus',
  async ({ room, user }) => {
    const { id } = await roomService.createRoom(room);
    return { room: { ...room, id }, user };
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    allIds: [],
    byId: {},
    current: '',
    allPlayerIds: [],
    playersById: {},
  },
  reducers: {
    onJoinRoom: (state, action) => {
      const user = action.payload;
      state.allPlayerIds.push(user.id);
      state.playersById[user.id] = user;
    },
    markReady: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = true;
    },
    markNotReady: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = false;
    },
    onLeave: (state, action) => {
      const id = action.payload;

      state.allPlayerIds = state.allPlayerIds.filter(
        (playerId) => playerId !== id,
      );
      delete state.playersById[id];
    },
    enterRoom: (state, action) => {
      const { room, user } = action.payload;
      state.current = room;
      const allPlayers = room.participants;
      state.allPlayerIds = allPlayers.map((player) => player.id);

      for (const player of allPlayers) {
        state.playersById[player.id] = player;
      }

      state.allPlayerIds.push(user.id);
      state.playersById[user.id] = user;
    },
    leaveRoom: (state, action) => {
      state.current = null;
      state.allPlayerIds = [];
      state.playersById = {};
    },
  },
  extraReducers: {
    [getRooms.fulfilled]: (state, action) => {
      const rooms = action.payload;
      const ids = rooms.map((room) => room.id);

      state.allIds = ids;

      for (const room of rooms) {
        state.byId[room.id] = room;
      }
    },
    [createRoom.fulfilled]: (state, action) => {
      const { room, user } = action.payload;

      state.current = room;
      state.allPlayerIds.push(user.id);
      state.playersById[user.id] = user;
    },
  },
});

export const {
  markReady,
  markNotReady,
  onJoinRoom,
  onLeave,
  leaveRoom,
  enterRoom,
} = roomSlice.actions;
export default roomSlice.reducer;
