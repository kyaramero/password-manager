import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from './database';
const { encrypt, decrypt } = require('./encryption');

const salt = 10;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: `http://${process.env.HOST}:3000`,
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
  const sql = 'SELECT * FROM passwords WHERE fk_user_id = ?';
  db.query(sql, [currentUser.user_id], (err, data) => {
    if (err) {
      return res.json({ Error: 'Error fetching passwords from the server' });
    }
    const decryptedData = data.map((item) => {
      try {
        const decryptedPassword = decrypt({
          iv: item.iv,
          password: item.password,
        });
        return { ...item, password: decryptedPassword };
      } catch (error) {
        console.error('Error decrypting password:', error.message);
        return { ...item, password: 'Error decrypting password' };
      }
    });

    return res.json(decryptedData);
  });
});
app.post('/passwords', (req, res) => {
  const isAccountPassword = 'url' in req.body;
  const sql = isAccountPassword
    ? 'INSERT INTO passwords (`type`, `url`, `password`, `email`, `brand`, `fk_user_id`, `iv`) VALUES (?)'
    : 'INSERT INTO passwords (`type`, `name`, `password`, `cvc_card`, `brand`, `exp_card`, `fk_user_id`, `num_card`, `iv`) VALUES (?)';

  const passwordField = isAccountPassword ? 'password' : 'cardPassword';
  const hashedPassword = encrypt(req.body[passwordField].toString());

  const data = isAccountPassword
    ? [
        'Account',
        req.body.url,
        hashedPassword.password,
        req.body.email,
        req.body.brand,
        currentUser['user_id'],
        hashedPassword.iv,
      ]
    : [
        'Card',
        req.body.cardName,
        hashedPassword.password,
        req.body.cvv,
        req.body.brand,
        req.body.expirationDate,
        currentUser['user_id'],
        req.body.cardNumber,
        hashedPassword.iv,
      ];

  db.query(sql, [data], (err, result) => {
    if (err) return res.json({ Error: 'Inserting data error in server' });
    return res.json({ Status: 'Success' });
  });
});

const checkDuplicates = (email, callback) => {
  const sql = 'SELECT * FROM login WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.length > 0);
    }
  });
};

app.post('/register', (req, res) => {
  const email = req.body.email;
  checkDuplicates(email, (err, isDuplicate) => {
    if (err) {
      return res.json({ Error: 'Error checking email in the server' });
    }
    if (isDuplicate) {
      return res.json({ Error: 'Email already exists. Try another.' });
    }
    const sql = 'INSERT INTO login (`name`, `email`, `password`) VALUES (?)';
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: 'Error for hashing password' });
      const data = [req.body.name, email, hash];

      db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Error: 'Inserting data error in server' });
        return res.json({ Status: 'Success' });
      });
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
            currentUser = { user_id: user_id, name: name };
            const token = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            });
            res.cookie('token', token);
            return res.json({ Status: 'Success' });
          } else {
            return res.json({ Error: "Password doesn't match" });
          }
        }
      );
    } else {
      return res.json({ Error: "Email doesn't exist. Create an account" });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Success' });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is running 🟢');
});
