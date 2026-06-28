'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const username = useAppSelector((state) => state.auth.username);
  const logout = async () => {
    dispatch(clearUser());
    dispatch(setFavoriteTracks([]));
    router.push('/auth/signin');
  };
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {username || 'Инкогнито'}
        </p>
        <div className={styles.sidebar__icon} onClick={logout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
