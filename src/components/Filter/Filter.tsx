'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import FilterItem from '@/components/FilterItem/FilterItem';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        type="author"
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        исполнителю
      </FilterItem>
      <FilterItem
        type="release_date"
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        году выпуска
      </FilterItem>
      <FilterItem
        type="genre"
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        жанру
      </FilterItem>
    </div>
  );
}
