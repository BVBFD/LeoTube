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

const router = Router();

router.put('/:id', update);

router.delete('/:id', deleteUser);

router.get('/find/:id', getUser);

router.put('/sub/:id', subscribe);

router.put('/unsub/:id', unsubscribe);

router.put('/like/:videoId', like);

router.put('/dislike./:videoId', dislike);

export default router;
