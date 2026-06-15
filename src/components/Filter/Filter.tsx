'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import FilterItem from '@/components/FilterItem/FilterItem';
import type { TrackType } from '@/sharedTypes/sharedTypes';

type FilterProps = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        type="author"
        tracks={tracks}
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        исполнителю
      </FilterItem>
      <FilterItem
        type="release_date"
        tracks={tracks}
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        году выпуска
      </FilterItem>
      <FilterItem
        type="genre"
        tracks={tracks}
        activeFilter={[activeFilter, setActiveFilter]}
        visible={[visible, setVisible]}
      >
        жанру
      </FilterItem>
    </div>
  );
}
