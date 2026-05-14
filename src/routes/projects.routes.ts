import { Router } from 'express';

import {
  getProfessionalProducts,
  getPersonalProducts
} from '../controllers/projects.controller';

const router = Router();

router.get('/professional', getProfessionalProducts);
router.get('/personal', getPersonalProducts);
export default router;
