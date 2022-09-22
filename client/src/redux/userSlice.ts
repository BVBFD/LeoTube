import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  img?: string;
  subscribers?: number;
  subscribedUsers?: string[];
  fromGoogle?: boolean;
  desc?: string;
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
};

type UserState = {
  currentUser: UserType | null;
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state?.currentUser?.subscribedUsers?.includes(action.payload)) {
        state?.currentUser?.subscribedUsers.splice(
          state?.currentUser?.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state?.currentUser?.subscribedUsers?.push(action.payload);
      }
    },
  },
});

export type { UserState, UserType };
export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
