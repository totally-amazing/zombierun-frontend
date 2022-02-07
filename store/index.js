import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import userReducer from './userSlice';
import settingReducer from './settingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    setting: settingReducer,
  },
});

export default store;
