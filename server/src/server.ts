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

interface CurrentUser {
  user_id: number;
  name: string;
}

let currentUser: CurrentUser = { user_id: 0, name: '' };

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

app.get('/passwords', (req, res) => {
  const sql = 'SELECT * FROM passwords WHERE fk_user_id = (?)';
  db.query(sql, [currentUser['user_id']], (err, data) => {
    if (err) return res.json('Error');
    return res.json(data);
  });
});

app.post('/passwords', (req, res) => {
  const sql =
    'INSERT INTO passwords (`type`, `url`, `password`, `email`, `brand`, `fk_user_id`) VALUES (?)';
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error for hashing password' });
    const data = [
      'Account',
      req.body.url,
      hash,
      req.body.email,
      req.body.brand,
      currentUser['user_id'],
    ];
    db.query(sql, [data], (err, result) => {
      if (err) return res.json({ Error: 'Inserting data error in server' });
      return res.json({ Status: 'Success' });
    });
  });
});

app.post('/passwords', (req, res) => {
  const sql =
    'INSERT INTO passwords (`type`, `name`, `password`, `cvc_card`, `brand`, `exp_card`, `fk_user_id`, `num_card`) VALUES (?)';
  bcrypt.hash(req.body.cardPassword.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error for hashing password' });
    const data = [
      'Card',
      req.body.cardName,
      hash,
      req.body.cvv,
      req.body.brand,
      req.body.expirationDate,
      currentUser['user_id'],
      req.body.cardNumber,
    ];
    db.query(sql, [data], (err, result) => {
      console.log('erro', err);
      if (err) return res.json({ Error: 'Inserting data error in server' });
      return res.json({ Status: 'Success' });
    });
  });
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
            const user_id = data[0].user_id;
            currentUser = { user_id, name };
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
