import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: { id: null, url: null, nickName: null },
  },
  reducers: {
    checkAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user.id = action.payload.user.id;
      state.user.url = action.payload.user.url;
      state.user.nickName = action.payload.user.nickName;
    },
  },
});

export const { checkAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
