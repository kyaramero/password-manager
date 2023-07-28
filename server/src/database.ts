import mysql from 'mysql';

export const db = mysql.createConnection({
  host: process.env.host,
  user: 'root',
  password: 'password',
  database: 'passwordmanager',
});
