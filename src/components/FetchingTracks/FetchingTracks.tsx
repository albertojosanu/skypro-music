'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getTracks, getFavorites } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { withReauth } from '@/utils/withReauth';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  const { access, refresh } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
          dispatch(setFetchError(null));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);

  useEffect(() => {
    if (access) {
      dispatch(setFetchIsLoading(true));
      withReauth(
        (newToken) => getFavorites(newToken || access),
        refresh,
        dispatch,
      )
        .then((res) => {
          dispatch(setFavoriteTracks(res));
          dispatch(setFetchError(null));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    } else {
      dispatch(setFavoriteTracks([]));
      dispatch(setFetchError(null));
    }
  }, [access]);

  return <></>;
}
