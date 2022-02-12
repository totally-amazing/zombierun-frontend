import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import HttpClient from '../network/http';
import RoomService from '../service/room';

const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient);

export const getRoomList = createAsyncThunk(
  'room/getRoomListStatus',
  async () => {
    const roomList = await roomService.getRooms();
    return roomList;
  },
);

export const createRoom = createAsyncThunk(
  'room/createRoomStatus',
  async (roomInfo) => {
    const { id } = await roomService.createRoom(roomInfo);
    return id;
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    list: [],
    id: '',
  },
  extraReducers: {
    [getRoomList.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default roomSlice.reducer;
