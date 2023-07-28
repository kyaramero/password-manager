import { Router } from 'express';
import { db } from '../database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CurrentUser } from '../types/user.types';

const router = Router();

const salt = 10;
let currentUser: CurrentUser = { user_id: 0, name: '' };

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

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Success' });
});

export default router;
