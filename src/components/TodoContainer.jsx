import React, { useState } from 'react';
import { DarkModeProvider } from '../context/DarkModeContext';
import styles from './TodoContainer.module.css';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

const INITIAL_FILTER = 'all';

export default function TodoContainer() {
  const [filter, setFilter] = useState(INITIAL_FILTER);

  return (
    <DarkModeProvider>
      <div className={styles.container}>
        <TodoFilter filter={filter} onFilterChange={setFilter} />
        <TodoList filter={filter} />
      </div>
    </DarkModeProvider>
  );
}
