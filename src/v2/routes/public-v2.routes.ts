import { Router } from 'express';
import {
  getAboutV2,
  getExperiencesV2,
  getPersonalProjectsV2,
  getProfessionalProjectsV2,
  getSocialV2,
} from '../controllers/public-content-v2.controller';

const router = Router();

router.get('/experience', getExperiencesV2);
router.get('/projects/professional', getProfessionalProjectsV2);
router.get('/projects/personal', getPersonalProjectsV2);
router.get('/social', getSocialV2);
router.get('/about', getAboutV2);

export default router;
