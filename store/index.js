import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import gameReducer from './gameSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    ui: uiReducer,
  },
});

export default store;
