import { createError } from './../error';
import { Request, Response, NextFunction } from 'express';
import Video from '../models/Video';
import User from '../models/User';

export const addVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'You can update only your video!'));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('The Video has been deleted.');
    } else {
      return next(createError(403, 'You can delete only your video!'));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('The view has been increased.');
  } catch (err) {
    next(err);
  }
};

export const random = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user?.subscribedUsers;

    if (!subscribedChannels) {
      return res.status(200).json(subscribedChannels);
    }

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res
      .status(200)
      .json(list.flat().sort((a, b) => b.createdAt! - a.createdAt!));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tags = (req.query.tags as string)?.split(',');
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query = req.query.q;
  try {
    // const videos = await Video.find({
    //   title: { $regex: `${query}`, $options: 'i' },
    // }).limit(40);

    const regExp = (str: string) => {
      let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      //특수문자 검증
      if (reg.test(str)) {
        //특수문자 제거후 리턴
        return str.replace(reg, '');
      } else {
        //특수문자가 없으므로 본래 문자 리턴
        return str;
      }
    };

    const videos2 = await Video.find();
    let newArr: any = [];
    let sendArr: any = [];
    videos2.forEach((video) => {
      let title = video.title
        ?.toString()
        // @ts-ignore
        .replaceAll(/\s/g, '')
        .toLowerCase();
      title = regExp(title);
      if (title.includes(query)) {
        newArr.push(video);
      }
    });

    newArr.sort((a: any, b: any) => b?.createdAt - a?.createdAt);

    for (let i = 0; i < 39; i++) {
      if (newArr[i]) {
        sendArr.push(newArr[i]);
      } else {
        break;
      }
    }

    res.status(200).json(sendArr);
  } catch (err) {
    next(err);
  }
};
