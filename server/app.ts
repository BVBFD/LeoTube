import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/Auth';
import commentRoutes from './routes/Comments';
import videoRoutes from './routes/Videos';
import userRoutes from './routes/Users';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_DB_URL, { dbName: 'leotube' })
  .then(() => console.log(`Mongo DB has been Connected!!`))
  .catch((error) => {
    throw error;
  });

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.get(
  '/test',
  async (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json('test');
    } catch (error) {
      throw error;
    }
  }
);

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
