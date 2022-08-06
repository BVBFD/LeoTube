import { createSlice } from '@reduxjs/toolkit';

type VideoType = {
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views?: number;
  tags?: string[];
  likes?: string[];
  dislikes?: string[];
};

type VideoState = {
  currentVideo: VideoType | null;
  loading: boolean;
  error: boolean;
};

const initialState: VideoState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo?.likes?.includes(action.payload)) {
        state.currentVideo?.likes?.push(action.payload);
        state.currentVideo?.dislikes?.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo?.dislikes?.includes(action.payload)) {
        state.currentVideo?.dislikes?.push(action.payload);
        state.currentVideo?.likes?.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export type { VideoState };
export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;
export default videoSlice.reducer;
