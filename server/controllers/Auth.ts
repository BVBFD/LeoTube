import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { createError } from '../error';
import { sign } from 'jsonwebtoken';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // prettier-ignore
    const user = await User.findOne({
      name: req.body.name,
    }) as unknown as UserImpl;

    if (!user) {
      return next(createError(400, 'Wrong Credentials!!'));
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isPassword) {
      return next(createError(400, 'Wrong Credentials!'));
    }

    const token = sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    req.session.token = token;
    req.session.ip = req.headers.ip;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // prettier-ignore
    const user = await User.findOne({
      email: req.body.email,
    }) as unknown as UserImpl;
    const { password, ...others } = user._doc;

    if (user) {
      const token = sign({ id: user._id }, process.env.JWT);
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const { password, ...others } = savedUser._doc;

      const token = sign({ id: savedUser._id }, process.env.JWT);

      req.session.token = token;
      req.session.ip = req.headers.ip;
      res.status(200).json(others);
    }
  } catch (error) {
    next(error);
  }
};
