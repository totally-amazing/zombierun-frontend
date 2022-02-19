import { createStore, combineReducers } from '@reduxjs/toolkit';

import gameReducer from '../../store/gameSlice';
import playerReducer from '../../store/playerSlice';
import roomReducer from '../../store/roomSlice';
import uiReducer from '../../store/uiSlice';
import userReducer from '../../store/userSlice';

export default function createTestStore() {
  const store = createStore(
    combineReducers({
      user: userReducer,
      game: gameReducer,
      room: roomReducer,
      player: playerReducer,
      ui: uiReducer,
    }),
  );

  return store;
}
