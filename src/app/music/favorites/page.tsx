'use client';

import { useEffect } from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { fetchError, fetchIsLoading, favoriteTracks } = useAppSelector(
    (state) => state.tracks,
  );

  useEffect(() => {
    if (!fetchIsLoading) {
      dispatch(setCurrentTrack(null));
      dispatch(setIsPlay(false));
    }
  }, [fetchIsLoading]);

  return (
    <Centerblock
      tracks={favoriteTracks}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title={'Треки'}
    />
  );
}
