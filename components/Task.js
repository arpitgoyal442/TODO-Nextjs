import React, { useState } from 'react';
import styles from '../styles/Task.module.css';

const Task = ({ title, description, completed, time }) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={styles.task}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.info}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          <span className={styles.checkmark}></span>
          <span className={styles.completed}>{isCompleted ? 'Completed' : 'Not Completed'}</span>
        </label>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default Task;
