'use client';

import { useState } from 'react';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authUser, getTokens } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import {
  setUsername,
  setAccessToken,
  setRefreshToken,
} from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);

    try {
      await authUser({ email, password })
        .then(() => {
          dispatch(setUsername(email));
          return getTokens({ email, password });
        })
        .then((res) => {
          dispatch(setAccessToken(res.access));
          dispatch(setRefreshToken(res.refresh));
        })
        .then((res) => {
          router.push('/music/main');
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          setErrorMessage('Отсутствует доступ к сети');
        } else {
          setErrorMessage('Неизвестная ошибка');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
