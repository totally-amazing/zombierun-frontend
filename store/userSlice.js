import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    nickname: null,
    imageUrl: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { id, nickname, imageUrl } = action.payload;
      state.id = id;
      state.nickname = nickname;
      state.imageUrl = imageUrl;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
