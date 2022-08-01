import { Request, Response, NextFunction } from 'express';
import { verify, VerifyErrors, Jwt, JwtPayload } from 'jsonwebtoken';
import { createError } from './error';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.token;

  if (!token) return next(createError(401, 'You are not authenticated!'));

  verify(
    token,
    process.env.JWT,
    (err: VerifyErrors | null, user: Jwt | JwtPayload | string | undefined) => {
      if (err) return next(createError(403, 'Token is not valid!'));
      req.user = user;
      next();
    }
  );
};
