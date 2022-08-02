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
// 백엔드 서버에서는 ip주소를 검사하는 미들웨어로 이중으로 검사할 수도 있음.
