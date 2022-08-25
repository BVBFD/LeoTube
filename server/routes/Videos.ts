import { verifyIp } from './../verifyIp';
import { verifyToken } from './../verifyToken';
import { Router, Request, Response, NextFunction } from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from '../controllers/Video';

const router = Router();

router.post('/', verifyIp, verifyToken, addVideo);

router.put('/:id', verifyIp, verifyToken, updateVideo);

router.delete('/:id', verifyIp, verifyToken, deleteVideo);

router.get('/find/:id', getVideo);

router.put('/view/:id', addView);

router.get('/trend', trend);

router.get('/random', random);

router.get('/sub', verifyIp, verifyToken, sub);

router.get('/tags', getByTag);

router.get('/search', search);

export default router;
