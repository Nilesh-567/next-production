// pages/api/factorial.js

import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { number } = req.body;

  if (number < 0) {
    return res.status(400).json({ message: 'Please enter a positive integer.' });
  }

  const factorial = (num) => (num === 0 ? 1 : num * factorial(num - 1));
  const result = factorial(number);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS numberr (
        id SERIAL PRIMARY KEY,
        number INTEGER NOT NULL,
        result BIGINT NOT NULL
      )
    `);
    await client.query('INSERT INTO numberr (number, result) VALUES ($1, $2)', [number, result]);
    await client.end();

    res.status(200).json({
      message: 'Connection successful! Number and factorial stored in the database.',
      result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed.', error: error.message });
  }
}
