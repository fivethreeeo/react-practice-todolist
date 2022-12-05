import React from 'react';
import styles from './TodoFilter.module.css';

const FILTER_NAME = {
  ALL: '전체보기',
  DOING: '진행 중',
  COMPLETED: '완료',
};

export default function TodoFilter({ activeFilter, setActiveFilter }) {
  const handleClick = e => {
    const clickedFilter = e.target.dataset.filter;
    if (clickedFilter === activeFilter) return;
    setActiveFilter(clickedFilter);
  };

  return (
    <div className={styles.filterWrap}>
      {Object.keys(FILTER_NAME).map((filterName, index) => {
        const buttonClassName = `${styles.button} ${
          filterName === activeFilter ? ` ${styles.active}` : ''
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
  );
}
