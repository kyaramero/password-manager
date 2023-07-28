import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from './database';
import authRouter from './routes/auth-routes';
import managerRouter from './routes/manager-routes';

const { encrypt, decrypt } = require('./encryption');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.HOST,
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(authRouter);
app.use(managerRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is running 🟢');
});
