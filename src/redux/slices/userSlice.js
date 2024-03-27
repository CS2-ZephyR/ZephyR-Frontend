import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steamId: 0,
  name: '',
  avatar: null,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { steamId, name, avatar } = action.payload;

      state.steamId = steamId;
      state.name = name;
      state.avatar = avatar;
      state.loading = false;
    },

    logout: (state) => {
      state.steamId = initialState.steamId;
      state.name = initialState.nickname;
      state.avatar = initialState.avatar;
    },

    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },

    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setUserData, logout, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
