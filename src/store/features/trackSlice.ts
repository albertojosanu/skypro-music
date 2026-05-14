import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentIndex = playlist.findIndex(
        (element) => element._id === state.currentTrack?._id,
      );
      const nextTrackIndex =
        currentIndex >= playlist.length - 1
          ? state.isShuffle
            ? 0
            : currentIndex
          : currentIndex + 1;
      state.currentTrack = playlist[nextTrackIndex];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentIndex = playlist.findIndex(
        (element) => element._id === state.currentTrack?._id,
      );
      const prevTrackIndex =
        currentIndex === 0
          ? state.isShuffle
            ? playlist.length - 1
            : currentIndex
          : currentIndex - 1;
      state.currentTrack = playlist[prevTrackIndex];
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
