import { Router } from 'express';
import { googleAuth, logout, signin, signup } from '../controllers/Auth';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/logout', logout);

router.post('/google', googleAuth);

export default router;
