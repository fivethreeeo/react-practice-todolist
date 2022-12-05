import React, { useCallback, useEffect, useReducer, useState } from 'react';
import itemsReducer from '../reducer/itemsReducer';

import styles from './TodoContainer.module.css';

import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const STORAGE_KEY = 'test123';
const INITIAL_FILTER = 'ALL';
const EMPTY_MESSAGE = {
  ALL: '할 일을 추가해주세요.',
  DOING: '진행 중인 할 일이 없어요.',
  COMPLETED: '완료된 할 일이 없어요.',
};

export default function TodoContainer() {
  const [activeFilter, setActiveFilter] = useState(INITIAL_FILTER);
  const [items, dispatchItems] = useReducer(
    itemsReducer,
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  );

  const handleAdd = content => dispatchItems({ type: 'added', content });
  const handleDelete = id => dispatchItems({ type: 'deleted', id });
  const handleCheck = id => dispatchItems({ type: 'checked', id });

  const getFilteredItems = useCallback((items, activeFilter) => {
    switch (activeFilter) {
      case 'DOING':
        return [...items].filter(item => !item.completed);
      case 'COMPLETED':
        return [...items].filter(item => item.completed);
      case 'ALL':
      default:
        return items;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TodoFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </header>

      <div className={styles.list}>
        {getFilteredItems(items, activeFilter).length > 0 ? (
          getFilteredItems(items, activeFilter).map(
            ({ id, content, completed }) => (
              <TodoItem
                key={id}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
                id={id}
                content={content}
                checked={completed}
              />
            )
          )
        ) : (
          <span>{EMPTY_MESSAGE[activeFilter]}</span>
        )}
      </div>

      <TodoForm handleAdd={handleAdd} />
    </div>
  );
}
