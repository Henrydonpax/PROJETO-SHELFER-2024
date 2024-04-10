import { Client } from 'pg';

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bancosistema',
  password: 'postgres',
  port: 5432,
});

export default db;



