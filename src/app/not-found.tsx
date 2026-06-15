import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';
import styles from './not-found.module.css';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={styles.loading}>
            <div className={styles.loading__code}>404</div>
            <div className={styles.loading__label}>Страница не найдена</div>
            <div className={styles.loading__description}>
              Возможно она была удалена или перенесена на другой адрес
            </div>
            <Link className={styles.loading__btnReturn} href="/music/main">
              Вернуться на главную
            </Link>
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
