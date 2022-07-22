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

router.put('/:id', verifyToken, update);

router.delete('/:id', verifyToken, deleteUser);

router.get('/find/:id', getUser);

router.put('/sub/:id', verifyToken, subscribe);

router.put('/unsub/:id', verifyToken, unsubscribe);

router.put('/like/:videoId', verifyToken, like);

router.put('/dislike/:videoId', verifyToken, dislike);

export default router;
