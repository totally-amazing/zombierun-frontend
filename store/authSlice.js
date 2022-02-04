import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: { id: null, nickname: null, token: null },
  },
  reducers: {
    checkAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user.id = action.payload.user.id;
      state.user.nickname = action.payload.user.nickname;
      state.user.token = action.payload.user.token;
    },
  },
});

export const { checkAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
