import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import HttpClient from '../network/http';
import AuthService from '../service/auth';

const httpClient = new HttpClient(BASE_URL);
const authService = new AuthService(httpClient);

export const fetchUserByIdToken = createAsyncThunk(
  'user/fetchByIdToeknStatus',
  async (idToken) => {
    const user = await authService.signIn(idToken);
    return user;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nickname: null,
    id: null,
    imageUrl: null,
  },
  extraReducers: {
    [fetchUserByIdToken.fulfilled]: (state, action) => {
      const { id, imageUrl, nickname } = action.payload;

      state.id = id;
      state.imageUrl = imageUrl;
      state.nickname = nickname;
    },
  },
});

export default userSlice.reducer;
