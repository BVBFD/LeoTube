import { verifyToken } from './../verifyToken';
import { Router } from 'express';
import { addComment, deleteComment, getComments } from '../controllers/Comment';

const router = Router();

router.post('/', verifyToken, addComment);

router.delete('/:id', verifyToken, deleteComment);

router.get('/:videoId', getComments);

export default router;
