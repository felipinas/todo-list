import { Trash } from 'phosphor-react';

import styles from './styles.module.css';

interface TaskProps {
  id: string;
  title: string;
  isDone: boolean | undefined;
  onDeleteTask: (taskId: string) => void | undefined;
  onChangeTaskStatus: (taskId: string) => void | undefined;
}

export function TaskBox({id, title, isDone, onDeleteTask, onChangeTaskStatus}: TaskProps) {
  function handleChangeTaskStatus() {
    onChangeTaskStatus(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskInfos}>
        <input
          onClick={handleChangeTaskStatus}
          type="checkbox"
          checked={isDone}
        />

        <p className={isDone ? styles.done : undefined}>
          {title}
        </p>
      </div>

      <button onClick={handleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  )
}