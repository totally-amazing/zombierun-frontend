import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: false },
  reducers: {},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
