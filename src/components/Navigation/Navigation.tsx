'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { access } = useAppSelector((state) => state.auth);

  const logout = async () => {
    dispatch(clearUser());
    dispatch(setFavoriteTracks([]));
    router.push('/auth/signin');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main" className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
            loading="eager"
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={() => setShow(!show)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {show && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {access ? (
              <>
                <li className={styles.menu__item}>
                  <Link href="/music/favorites" className={styles.menu__link}>
                    Мой плейлист
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <p onClick={logout} className={styles.menu__link}>
                    Выйти
                  </p>
                </li>
              </>
            ) : (
              <li className={styles.menu__item}>
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
