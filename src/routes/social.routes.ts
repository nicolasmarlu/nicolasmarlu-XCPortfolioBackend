import { Router } from 'express';

import {
  getSocialMedia
} from '../controllers/social.controller';

const router = Router();

router.get('/', getSocialMedia);

export default router;
