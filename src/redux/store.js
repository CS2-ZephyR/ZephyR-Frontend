import { configureStore } from '@reduxjs/toolkit';

import { skinSlice, userSlice } from './slices';

const store = configureStore({
  reducer: {
    user: userSlice,
    skin: skinSlice,
  },
});

export default store;
