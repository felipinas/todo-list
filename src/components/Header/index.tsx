import styles from './styles.module.css'
import LogoImg from '../../assets/todo-logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={LogoImg} alt="ToDo Logo" />
    </header>
  )
}