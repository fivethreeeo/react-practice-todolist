import React from 'react';
import styles from './TodoFilter.module.css';
import { useDarkMode } from '../context/DarkModeContext';

const FILTER_NAME = {
  all: '전체보기',
  doing: '진행 중',
  done: '완료',
};

export default function TodoFilter({ filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleClick = e => {
    const clickedFilter = e.target.dataset.filter;
    if (clickedFilter === filter) return;
    onFilterChange(clickedFilter);
  };

  return (
    <header className={styles.header}>
      <button onClick={toggleDarkMode}>Dark {darkMode ? 'ON' : 'OFF'}</button>
      <div className={styles.filterWrap}>
        {Object.keys(FILTER_NAME).map((filterName, index) => {
          const buttonClassName = `${styles.button} ${
            filterName === filter ? ` ${styles.active}` : ''
          }`;

          return (
            <button
              onClick={handleClick}
              className={buttonClassName}
              data-filter={filterName}
              key={index}
            >
              {FILTER_NAME[filterName]}
            </button>
          );
        })}
      </div>
    </header>
  );
}
