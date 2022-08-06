import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import videoReducer from './videoSlice.js';

const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
