// import { createError } from './error';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import session from 'express-session';
// const fileStore = require('session-file-store')(session);
import MongoStore from 'connect-mongo';

import authRoutes from './routes/Auth';
import commentRoutes from './routes/Comments';
import videoRoutes from './routes/Videos';
import userRoutes from './routes/Users';
// import { getUsersnum, removeUsersnum } from './session';
import cors from 'cors';

const corsOpt = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
  credentials: true,
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

const sess = {
  secure: true, // http 환경에서만 session 정보를 주고 받도록 처리
  secret: process.env.SESS, // 암호화하는 데 쓰이는 키 ( cookie-parser secret 설정과 동일하게 설정하는게 좋음 )
  resave: false, // session을 언제나 저장할지 설정
  saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션 설정할지 설정
  cookie: {
    httpOnly: true, // 클라이언트에서 자바스크립트를 통해서 쿠키 사용 못하게 방지
    maxAge: 60 * 60 * 12, // 쿠키 유효 기간 설정 ( 60초 60분 12시간 )
  },
  store: MongoStore.create({
    dbName: 'session',
    mongoUrl: process.env.MONGO_DB_URL,
  }),
  // name: "session-cookie" 세션 쿠키명 디폴트값은 connect.sid지만 다른 이름을 줄수도 있음
};

app.use(cookieParser(process.env.SESS));
app.use(session(sess));
app.use(express.json());

// app.post('/usersnum', getUsersnum);
// app.get('/removeusersnum', removeUsersnum);

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
