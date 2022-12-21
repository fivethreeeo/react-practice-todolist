import React, { useEffect, useReducer } from 'react';
import styles from './TodoList.module.css';
import itemsReducer from '../reducer/itemsReducer';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const STORAGE_KEY = 'TODO_TEST_123';
const INITIAL_ITEMS = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const EMPTY_MESSAGE = {
  all: '할 일을 추가해주세요.',
  doing: '진행 중인 할 일이 없어요.',
  done: '완료된 할 일이 없어요.',
};

export default function TodoList({ filter }) {
  const [items, dispatchItems] = useReducer(itemsReducer, INITIAL_ITEMS);

  const handleAdd = added => dispatchItems({ type: 'added', item: added });
  const handleDelete = deleted => dispatchItems({ type: 'deleted', item: deleted });
  const handleUpdate = updated => dispatchItems({ type: 'updated', item: updated });

  const filteredItems = getFilteredItems(items, filter);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className={styles.list}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <span>{EMPTY_MESSAGE[filter]}</span>
        )}
      </div>
      <TodoForm onAdd={handleAdd} />
    </>
  );
}

const getFilteredItems = (items, filter) => {
  switch (filter) {
    case 'doing': {
      return items.filter(({ status }) => status === 'doing');
    }

    case 'done': {
      return items.filter(({ status }) => status === 'done');
    }

    case 'all':
    default: {
      return items;
    }
  }
};
