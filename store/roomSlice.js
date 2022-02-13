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
    eventRemovers: [],
  },
  reducers: {
    joinRoom: (state, action) => {
      const { user, roomId } = action.payload;

      state.current = state.byId[roomId];

      const allPlayers = state.current.participants;
      state.allPlayerIds = allPlayers.map((player) => player.id);

      for (const player of allPlayers) {
        state.playersById[player.id] = player;
      }

      state.allPlayerIds.push(user.id);
      state.playersById[user.id] = user;

      roomService.emit('join', roomId, user);

      const offJoin = roomService.on('join', (player) => {
        state.allPlayerIds.push(player.id);
        state.playersById = {
          ...state.playersById,
          [player.id]: player,
        };
      });

      const offReady = roomService.on('ready', (id) => {
        state.playersById[id].isReady = true;
      });

      const offNotReady = roomService.on('notReady', (id) => {
        state.playersById[id].isReady = false;
      });

      const offLeave = roomService.on('leave', (id) => {
        state.allPlayerIds = state.allPlayerIds.filter(
          (playerId) => playerId !== id,
        );
        delete state.playersById[id];
      });

      state.eventRemovers = [offJoin, offReady, offNotReady, offLeave];
    },
    ready: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = true;

      roomService.emit('ready');
    },
    notReady: (state, action) => {
      const id = action.payload;
      state.playersById[id].isReady = false;

      roomService.emit('notReady');
    },
    leave: (state, action) => {
      state.current = null;
      state.allPlayerIds = [];
      state.playersById = {};

      for (const offEvent of state.eventRemovers) {
        offEvent();
      }

      roomService.emit('leave');
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

export const { joinRoom, ready, notReady, leave } = roomSlice.actions;
export default roomSlice.reducer;
