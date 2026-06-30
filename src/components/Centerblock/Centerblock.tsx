import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';

type CenterBlockProps = {
  tracks: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
};

export default function Centerblock({
  errorRes,
  isLoading,
  tracks,
  title,
}: CenterBlockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <Filter tracks={isLoading ? data : tracks} />
      <h2 className={styles.centerblock__h2}>{title}</h2>
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

        <div className={styles.content__playlist}>
          {errorRes
            ? errorRes
            : isLoading
              ? 'Загрузка'
              : tracks.map((track) => (
                  <Track key={track._id} track={track} playlist={tracks} />
                ))}
        </div>
      </div>
    </div>
  );
}
