// pages/index.js

import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Calculating...');
    setResult(null);

    try {
      const response = await fetch('/api/factorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: parseInt(number) }),
      });
      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setStatus(data.message);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Factorial Calculator</h1>
      <p className={styles.description}>
        Enter a number to calculate its factorial and store it in PostgreSQL.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          min="0"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </form>

      {status && <p className={styles.status}>{status}</p>}
      {result !== null && (
        <p className={styles.result}>
          Factorial: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}
