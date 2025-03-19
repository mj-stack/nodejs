import { useState } from 'react';
import styles from './Form.module.css';

function Form({ handleFormSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    console.log('Submitting Data:', userData);
    handleFormSubmit(userData); // Send directly
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <input className={styles.nameInput} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" />
      <input className={styles.emailInput} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
      <input className={styles.passwordInput} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
      <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
  );
}

export default Form;