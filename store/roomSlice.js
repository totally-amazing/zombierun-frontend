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

export const enterRoom = createAsyncThunk(
  'room/enterRoomStatues',
  async ({ roomId, userId }) => {
    const room = await roomService.enterRoom(roomId, userId);
    return room;
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
      const allPlayers = action.payload;
      state.allPlayerIds = allPlayers.map((player) => player.id);

      for (const player of allPlayers) {
        state.playersById[player.id] = player;
      }
    },
    onReady: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = true;

      roomService.emit('ready');
    },
    onNotReady: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = false;

      roomService.emit('notReady');
    },
    leaveRoom: (state, action) => {
      state.current = null;
      state.allPlayerIds = [];
      state.playersById = {};
    },
    onLeave: (state, action) => {
      const id = action.payload;

      state.allPlayerIds = state.allPlayerIds.filter(
        (playerId) => playerId !== id,
      );
      delete state.playersById[id];
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
    [enterRoom.fulfilled]: (state, action) => {
      const room = action.payload;

      state.current = room;
      state.allPlayerIds = room.participants.map((player) => player.id);

      for (const player of room.participants) {
        state.playersById[player.id] = player;
      }
    },
  },
});

export const { onReady, onNotReady, onJoinRoom, onLeave, leaveRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
