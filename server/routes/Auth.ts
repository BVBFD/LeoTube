import { Router } from 'express';
import { googleAuth, signin, signup } from '../controllers/Auth';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/google', googleAuth);

export default router;