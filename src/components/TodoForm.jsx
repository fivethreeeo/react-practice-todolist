import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoForm.module.css';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    text.trim().length && onAdd({ id: uuidv4(), text, status: 'doing' });
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={text}
        placeholder={'할 일을 입력하세요.'}
        type='text'
        name='content'
        required
      />
      <button type='submit'>할 일 추가</button>
    </form>
  );
}
