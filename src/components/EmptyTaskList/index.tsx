import { ClipboardText } from 'phosphor-react';

import styles from './styles.module.css'

export function EmptyTaskList() {
  return (
    <div className={styles.emptyTaskList}>
      <ClipboardText size={56} />

      <b>Você ainda não tem tarefas cadastradas</b>

      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}