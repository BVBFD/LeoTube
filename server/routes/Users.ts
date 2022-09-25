import { Router } from 'express';
import {
  deleteUser,
  getUser,
  update,
  subscribe,
  unsubscribe,
  like,
  dislike,
  pullDislike,
  pullLike,
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

router.put('/pullLike/:videoId', verifyToken, pullLike);

router.put('/pullDislike/:videoId', verifyToken, pullDislike);

export default router;
