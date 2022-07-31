import { createError } from './error';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import session from 'express-session';
const fileStore = require('session-file-store')(session);
import MongoStore from 'connect-mongo';

import authRoutes from './routes/Auth';
import commentRoutes from './routes/Comments';
import videoRoutes from './routes/Videos';
import userRoutes from './routes/Users';
import { getUsersnum, removeUsersnum } from './session';
import cors from 'cors';

const corsOpt = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
  credentials: true,
};

const sess = {
  secret: 'leotube',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
  store: MongoStore.create({
    dbName: 'session',
    mongoUrl: process.env.MONGO_DB_URL,
  }),
};

dotenv.config();
const app = express();
app.use(cors(corsOpt));

mongoose
  .connect(process.env.MONGO_DB_URL, { dbName: 'leotube' })
  .then(() => console.log(`Mongo DB has been Connected!!`))
  .catch((error) => {
    throw error;
  });

app.use(cookieParser());
app.use(session(sess));
app.use(express.json());

app.post('/usersnum', getUsersnum);
app.get('/removeusersnum', removeUsersnum);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json('test');
  } catch (error) {
    next(error);
  }
});

app.use((error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Hi Seong Eun Lee');
  console.log('Server is running');
});
