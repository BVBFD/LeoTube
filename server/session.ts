import { createError } from './error';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const randomNum = (min: number, max: number) => {
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};

const getUsersnum = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.sessionID);
  try {
    if (!req.session.num) {
      req.session.num = { id: randomNum(1, 500), name: req.body.name };
    } else {
      req.session.num = { id: randomNum(1, 500), name: req.body.name };
    }

    res.status(200).json(`${req.session.num.name} 접속`);
  } catch (error) {
    next(error);
  }
};

const removeUsersnum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.headers.cookie?.split('=')[1]);
    req.session.destroy((err) => {
      if (err) next(createError(400, err));
      res.status(204).json('delete session');
      //   res.redirect(302, '/');
    });
    res.clearCookie('connect.sid');
  } catch (error) {
    next(createError(400, `${error}`));
  }
};

export { getUsersnum, removeUsersnum };
