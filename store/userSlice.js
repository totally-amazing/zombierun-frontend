import { BASE_URL } from '@env';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HttpClient from '../network/http';
import AuthService from '../service/auth';

const httpClient = new HttpClient(BASE_URL);
const authService = new AuthService(httpClient);

export const signIn = createAsyncThunk('user/signInStatus', async (idToken) => {
  const user = await authService.signIn(idToken);
  await AsyncStorage.setItem('accessToken', user.token);

  return user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    nickname: null,
    imageUrl: null,
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      const { id, imageUrl, nickname } = action.payload;

      state.id = id;
      state.imageUrl = imageUrl;
      state.nickname = nickname;
    },
  },
});

export default userSlice.reducer;
