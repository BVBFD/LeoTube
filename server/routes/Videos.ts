import { Router, Request, Response, NextFunction } from 'express';
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from '../controllers/Video';

const router = Router();

router.post('/', addVideo);

router.put('/:id', addVideo);

router.delete('/:id', addVideo);

router.get('/find/:id', getVideo);

router.put('/view/:id', addView);

router.get('/trend', trend);

router.get('/random', random);

router.get('/sub', sub);

router.get('/tags', getByTag);

router.get('/search', search);

export default router;
