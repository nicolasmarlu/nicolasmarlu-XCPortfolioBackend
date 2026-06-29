import { Router } from 'express';
import { login, me } from '../controllers/auth-v2.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/me', requireAdmin, me);

export default router;
