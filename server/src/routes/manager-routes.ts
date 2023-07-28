import { Router } from 'express';
import { db } from '../database';
import jwt from 'jsonwebtoken';
import { CurrentUser } from '../types/user.types';

const { encrypt, decrypt } = require('../encryption');

const router = Router();

let currentUser: CurrentUser = { user_id: 0, name: '' };

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

router.get('/', verifyUser, (req, res) => {
  return res.json({ Status: 'Success', name: req['name'] });
});

router.get('/passwords', (req, res) => {
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
router.post('/passwords', (req, res) => {
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

export default router;
