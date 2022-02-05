import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: true,
    user: { id: null, nickname: null, imageUrl: null },
  },
  reducers: {
    checkAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      const { id, nickname, imageUrl } = action.payload.user;
      state.user = { id, nickname, imageUrl };
    },
  },
});

export const { checkAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
