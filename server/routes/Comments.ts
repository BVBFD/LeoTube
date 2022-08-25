import { verifyToken } from './../verifyToken';
import { Router } from 'express';
import { addComment, deleteComment, getComments } from '../controllers/Comment';

const router = Router();

router.post('/', addComment);

router.delete('/:id', deleteComment);

router.get('/:videoId', getComments);

export default router;
