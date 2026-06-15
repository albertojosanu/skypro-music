import styles from './layout.module.css';

export default function HomeLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.loading}>Загрузка</div>;
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
