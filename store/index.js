import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import gameReducer from './gameSlice';
import roomReducer from './roomSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    room: roomReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
