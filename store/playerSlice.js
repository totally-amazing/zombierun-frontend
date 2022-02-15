import { createSlice } from '@reduxjs/toolkit';

import { createRoom, enterRoom, leaveRoom } from './roomSlice';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    allIds: [],
    byId: {},
  },
  reducers: {
    onJoinRoom: (state, action) => {
      const user = action.payload;
      state.allIds.push(user.id);
      state.byId[user.id] = user;
    },
    markReady: (state, action) => {
      const id = action.payload;
      state.byId[id].isReady = true;
    },
    markNotReady: (state, action) => {
      const id = action.payload;
      state.byId[id].isReady = false;
    },
    onLeave: (state, action) => {
      const id = action.payload;

      state.allIds = state.allIds.filter((playerId) => playerId !== id);
      delete state.byId[id];
    },
  },
  extraReducers: {
    [createRoom.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.allIds = [user.id];
      state.byId = {
        [user.id]: user,
      };
    },
    [leaveRoom]: (state, action) => {
      state.allIds = [];
      state.byId = {};
    },
    [enterRoom]: (state, action) => {
      const { room, user } = action.payload;

      const allPlayers = room.participants;
      state.allIds = allPlayers.map((player) => player.id);

      for (const player of allPlayers) {
        state.byId[player.id] = player;
      }

      state.allIds.push(user.id);
      state.byId[user.id] = user;
    },
  },
});

export const { onJoinRoom, markReady, markNotReady, onLeave } =
  playerSlice.actions;

export default playerSlice.reducer;
