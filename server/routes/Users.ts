import { verifyIp } from './../verifyIp';
import { Router, Request, Response, NextFunction } from 'express';
import {
  deleteUser,
  getUser,
  update,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from '../controllers/User';
import { verifyToken } from '../verifyToken';

const router = Router();

router.put('/:id', verifyIp, verifyToken, update);

router.delete('/:id', verifyIp, verifyToken, deleteUser);

router.get('/find/:id', getUser);

router.put('/sub/:id', verifyIp, verifyToken, subscribe);

router.put('/unsub/:id', verifyIp, verifyToken, unsubscribe);

router.put('/like/:videoId', verifyIp, verifyToken, like);

router.put('/dislike/:videoId', verifyIp, verifyToken, dislike);

export default router;
