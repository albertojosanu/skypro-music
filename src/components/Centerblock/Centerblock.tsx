import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import styles from './centerblock.module.css';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  setCurrentSelection,
  setCurrentPlaylist,
} from '@/store/features/trackSlice';
import { getTracks, getSelection } from '@/services/tracks/trackApi';

type CenterBlockProps = {
  id?: string;
};

export default function Centerblock({ id = '' }: CenterBlockProps) {
  const dispatch = useAppDispatch();
  const selection = useAppSelector((state) => state.tracks.selection);

  const [error, setError] = useState('');

  useEffect(() => {
    getTracks()
      .then((res) => {
        dispatch(setCurrentPlaylist(res));
      })
      .then(() => {
        id
          ? getSelection(id)
              .then((res) => {
                //dispatch(setCurrentPlaylist(playlist.filter((element)=> res.items.includes(element._id))));
                dispatch(setCurrentSelection(res));
              })
              .catch((error) => {
                if (error instanceof AxiosError) {
                  if (error.response) {
                    setError(error.response.data);
                  } else if (error.request) {
                    setError('Отсутствует доступ к сети');
                  } else {
                    setError('Неизвестная ошибка');
                  }
                }
              })
          : dispatch(
              setCurrentSelection({
                _id: 0,
                name: '',
                items: [],
                owner: '',
                __v: 0,
              }),
            );
      });
  }, []);

  const name = id
    ? useAppSelector((state) => state.tracks.selection.name)
    : 'Треки';
  const playlist = id
    ? useAppSelector((state) => state.tracks.playlist).filter((element) =>
        selection.items.includes(element._id),
      )
    : useAppSelector((state) => state.tracks.playlist);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{name}</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.centerblock__error}>{error}</div>

        <div className={styles.content__playlist}>
          {playlist.map((track) => (
            <Track key={track._id} track={track} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
