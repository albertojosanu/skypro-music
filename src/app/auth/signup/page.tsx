'use client';

import { useState } from 'react';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth/authApi';
import { AxiosError } from 'axios';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !passwordRepeat.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== passwordRepeat) {
      return setErrorMessage('Введенные пароли не совпадают');
    }

    setIsLoading(true);

    registerUser({ email, password, username: email })
      .then((res) => {
        router.push('/auth/signin');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Отсутствует доступ к сети');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
          console.log(error.config);
        }
      })
      .finally(() => setIsLoading(false));
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
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
