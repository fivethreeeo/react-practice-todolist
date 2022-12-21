import React from 'react';
import styles from './TodoItem.module.css';

export default function TodoItem({ item, onUpdate, onDelete }) {
  const { id, text, status } = item;

  const handleChange = ({ target }) =>
    onUpdate({ ...item, status: target.checked ? 'done' : 'doing' });

  return (
    <div className={styles.item}>
      <input
        type='checkbox'
        id={id}
        checked={status === 'done'}
        onChange={handleChange}
      />
      <label htmlFor={id}>{text}</label>
      <button onClick={() => onDelete(item)}>x</button>
    </div>
  );
}
