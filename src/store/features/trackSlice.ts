import { TrackType, SelectionType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  selection: null | SelectionType;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  selection: null,
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<null | TrackType>) => {
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
    setCurrentSelection: (state, action: PayloadAction<SelectionType>) => {
      state.selection = action.payload;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = current(state.favoriteTracks).filter(
        (item) => item !== action.payload,
      );
    },
    setFetchError: (state, action: PayloadAction<null | string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
  setCurrentSelection,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
