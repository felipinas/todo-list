import { useState, ChangeEvent, FormEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import { uid } from 'uid';

import styles from './styles.module.css'

interface Task {
  id: string;
  title: string;
  isDone: Boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (newTaskText) {
      const newTask = {
        id: uid(),
        title: newTaskText,
        isDone: false
      }
  
      setTasks(state => [...state, newTask])
    }
  }

  function getCreatedTasksAmount() {
    return tasks.length
  }

  function getDoneTasksAmount() {
    return tasks.filter(task => task.isDone).length;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder='Adicione uma nova tarefa'
          onChange={handleNewTaskChange}
          value={newTaskText}
        />

        <button type="submit">
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <section className={styles.taskList}>
        <header>
          <div>
            <b>Tarefas criadas</b>
            
            <span>{getCreatedTasksAmount()}</span>
          </div>

          <div>
            <b>Concluídas</b>

            <span>
              {getDoneTasksAmount()} de {getCreatedTasksAmount()}
            </span>
          </div>
        </header>

        <ul>
          {tasks.map(task => <li key={task.id}>{task.title}</li>)}
        </ul>
      </section>
    </>
  )
}