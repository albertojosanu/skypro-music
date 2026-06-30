'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './bar.module.css';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        loop={isLoop}
        onLoadedMetadata={() => {
          setIsLoadedTrack(true);
          playTrack();
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          pauseTrack();
          dispatch(setNextTrack());
        }}
        hidden
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.btnText}>
          {getTimePanel(currentTime, audioRef.current?.duration)}
        </div>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          value={currentTime}
          step={0.1}
          onChange={(e) => {
            audioRef.current &&
              (audioRef.current.currentTime = Number(e.target.value));
          }}
          readOnly={!isLoadedTrack}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={() => {
                  pauseTrack();
                  dispatch(setPrevTrack());
                }}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={
                  isPlay ? pauseTrack : isLoadedTrack ? playTrack : undefined
                }
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div
                className={styles.player__btnNext}
                onClick={() => {
                  pauseTrack();
                  dispatch(setNextTrack());
                }}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  {
                    [styles.active]: isLoop,
                  },
                )}
                onClick={() => setIsLoop(!isLoop)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  {
                    [styles.active]: isShuffle,
                  },
                )}
                onClick={() => {
                  dispatch(toggleShuffle());
                }}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack?.album}
                  </Link>
                </div>
              </div>
              <div
                className={classNames(styles.trackPlay__like, styles.btnIcon)}
              >
                <svg
                  className={classNames(
                    styles.trackPlay__likeSvg,
                    isLike
                      ? styles.trackPlay__likeSvg__enabled
                      : styles.trackPlay__likeSvg__disabled,
                  )}
                  onClick={toggleLike}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  value={volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (audioRef.current)
                      audioRef.current.volume = Number(e.target.value) / 100;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
