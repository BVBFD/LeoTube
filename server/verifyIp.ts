import { createError } from './error';
import { Request, Response, NextFunction } from 'express';

export const verifyIp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.session.ip;

  if (ip !== req.headers.ip || ip == null) {
    return next(createError(401, 'You are not authenticated!'));
  } else {
    next();
  }
};
