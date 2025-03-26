import { useContext } from 'react'
import styles from './WelcomeMessage.module.css'
import { TodoItemsContext } from '../store/todo-item-store'

function WelcomeMessage() {
  const {todoItems} = useContext(TodoItemsContext)

  return todoItems.length === 0 && <p className={styles.WelcomeMessage}>Enjoy your day</p>
}

export default WelcomeMessage