import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import gameReducer from './gameSlice';
import roomReducer from './roomSlice';
import playerReducer from './playerSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    room: roomReducer,
    player: playerReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
