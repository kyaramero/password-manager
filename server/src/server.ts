// import '@controllers/DummyController';
import * as dotenv from 'dotenv';
import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

app.use(cookieParser());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'passwordmanager',
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You're not authenticated" });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token isn't correct" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get('/', verifyUser, (req, res) => {
  return res.json({ Status: 'Success', name: req['name'] });
});

app.post('/register', (req, res) => {
  const sql = 'INSERT INTO login (`name`, `email`, `password`) VALUES (?)';
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error for hashing password' });
    const data = [req.body.name, req.body.email, hash];

    db.query(sql, [data], (err, result) => {
      if (err) return res.json({ Error: 'Inserting data error in server' });
      return res.json({ Status: 'Success' });
    });
  });
});

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE email = ?';
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: 'Login error in server' });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Can't compare password" });
          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            });
            res.cookie('token', token);
            return res.json({ Status: 'Success' });
          } else {
            return res.json({ Error: "Password didn't match" });
          }
        }
      );
    } else {
      return res.json({ Error: "Email doesn't exist" });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Success' });
});

app.listen(3001, () => {
  console.log('Server is running 🟢');
});

// dotenv.config();
// const port = 3001;
