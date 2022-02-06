import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    checkAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
