import chatReducer from './slices/chatSlice';

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
})