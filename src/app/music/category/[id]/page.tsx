'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import type { TrackType } from '@/sharedTypes/sharedTypes';
import { getSelection } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const id = params.id;

  useEffect(() => {
    setIsLoading(true);

    if (!fetchIsLoading) {
      getSelection(id)
        .then((res) => {
          setTitle(res.name);
          const tracksIds = res.items;
          const resultTracks = allTracks.filter((el) =>
            tracksIds.includes(el._id),
          );

          setTracks(resultTracks);
          dispatch(setCurrentTrack(null));
          dispatch(setIsPlay(false));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              setErrorRes(error.response.data);
            } else if (error.request) {
              setErrorRes('Ошибочка вышла');
            }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fetchIsLoading]);

  return (
    <Centerblock
      tracks={tracks}
      isLoading={isLoading}
      errorRes={errorRes || fetchError}
      title={title}
    />
  );
}
