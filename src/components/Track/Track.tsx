'use client';

import Link from 'next/link';
import classNames from 'classnames';
import styles from './track.module.css';
import { TrackProp } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
} from '@/store/features/trackSlice';

export default function Track({ track, playlist }: TrackProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  return (
    <div
      className={styles.playlist__item}
      onClick={() => {
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentPlaylist(playlist));
        dispatch(setIsPlay(false));
      }}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg
              className={classNames(styles.track__titleSvg, {
                [styles.track__active]:
                  isPlay && currentTrack?._id === track._id,
              })}
            >
              <use
                xlinkHref={
                  currentTrack?._id === track._id
                    ? '/img/icon/sprite.svg#icon-dot'
                    : '/img/icon/sprite.svg#icon-note'
                }
              ></use>
            </svg>
          </div>
          <div className={styles.track__titleText}>
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
