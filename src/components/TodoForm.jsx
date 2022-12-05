import React, { useState } from 'react';
import styles from './TodoForm.module.css';

export default function TodoForm({ handleAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => setInputValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const newContent = inputValue.trim();
    newContent && handleAdd(newContent);
    setInputValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={inputValue}
        placeholder={'할 일을 입력하세요.'}
        type='text'
        name='content'
        required
      />
      <button type='submit'>할 일 추가</button>
    </form>
  );
}
