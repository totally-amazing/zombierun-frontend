import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import HttpClient from '../network/http';
import RoomService from '../service/room';

const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient);

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
  },
  reducers: {
    enterRoom: (state, action) => {
      const { room } = action.payload;
      state.current = room;
    },
    leaveRoom: (state, action) => {
      state.current = null;
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
      const { room } = action.payload;

      state.current = room;
    },
  },
});

export const { leaveRoom, enterRoom } = roomSlice.actions;
export default roomSlice.reducer;
