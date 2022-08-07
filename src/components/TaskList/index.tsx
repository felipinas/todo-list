import { useState, ChangeEvent, FormEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import { uid } from 'uid';

import { TaskBox } from '../TaskBox';
import { EmptyTaskList } from '../EmptyTaskList';

import styles from './styles.module.css'

interface Task {
  id: string;
  title: string;
  isDone: boolean;
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
  
      setTasks(state => [...state, newTask]);

      setNewTaskText('');
    }
  }

  function deleteTask(taskId: string) {
    const tasksWithoutRemovedOne = tasks.filter(task => task.id !== taskId);

    setTasks(tasksWithoutRemovedOne);
  }

  function changeTaskStatus(taskId: string) {
    const tasksAfterUpdate = tasks.map(task => {
      return task.id === taskId ? { ...task, isDone: !task.isDone } : task;
    })

    setTasks(tasksAfterUpdate);
  };

  function getCreatedTasksAmount() {
    return tasks.length
  }

  function getDoneTasksAmount() {
    return tasks.filter(task => task.isDone).length;
  }

  const isThereTask = tasks.length > 0;

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

        {
          isThereTask ?
          <ul>
            {
              tasks.map(({id, title, isDone}) => {
                return (
                  <li key={id}>
                    <TaskBox
                      id={id}
                      title={title}
                      isDone={isDone}
                      onChangeTaskStatus={changeTaskStatus}
                      onDeleteTask={deleteTask}
                    />
                  </li>
                )
              })
            }
          </ul>
          :
          <EmptyTaskList />
        }
      </section>
    </>
  )
}