import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import userReducer from './userSlice';
import gameReducer from './gameSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    game: gameReducer,
    ui: uiReducer,
  },
});

export default store;
