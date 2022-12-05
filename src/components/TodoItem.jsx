import React, { useState } from 'react';
import styles from './TodoItem.module.css';

export default function TodoItem({
  id,
  content,
  checked,
  handleCheck,
  handleDelete,
}) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className={styles.item}>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={() => {
          handleCheck(id);
          setIsChecked(checked => !checked);
        }}
      />
      <span>{content}</span>
      <button onClick={() => handleDelete(id)}>x</button>
    </div>
  );
}
