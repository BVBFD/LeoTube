import { Request, Response, NextFunction } from 'express';
import { createError } from '../error';
import User from '../models/User';
import Video from '../models/Video';

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account'));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      // 세션 서버, 브라우저 삭제 과정
      try {
        req.session.destroy((err) => {
          if (err) next(createError(400, err));
          res.status(204).json('delete login data session');
          //   res.redirect(302, '/');
        });
        res.clearCookie('connect.sid');
      } catch (error) {
        next(createError(400, `${error}`));
      }
      // 세션 서버, 브라우저 삭제 과정
    } catch (error) {
      next(createError(404, `Not Found`));
    }
  } else {
    return next(createError(403, 'You can update only your account'));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json('Subscription success!!');
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('Unsubscription success!!');
  } catch (error) {
    next(error);
  }
};

export const like = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('The video has been liked!!');
  } catch (error) {
    next(error);
  }
};

export const dislike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('The video has been disliked.');
  } catch (error) {
    next(error);
  }
};
