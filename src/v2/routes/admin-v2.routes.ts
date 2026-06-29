import { Router } from 'express';
import {
  getAbout,
  getStats,
  listExperiences,
  listProjects,
  listSocial,
  removeExperience,
  removeProject,
  removeSocial,
  saveAbout,
  saveExperience,
  saveProject,
  saveSocial,
} from '../controllers/admin-content-v2.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { seedContent } from '../seeds/content.seed';

const router = Router();

router.use(requireAdmin);

router.get('/stats', getStats);

router.get('/experiences', listExperiences);
router.post('/experiences', saveExperience);
router.put('/experiences/:id', saveExperience);
router.delete('/experiences/:id', removeExperience);

router.get('/projects', listProjects);
router.post('/projects', saveProject);
router.put('/projects/:id', saveProject);
router.delete('/projects/:id', removeProject);

router.get('/social', listSocial);
router.post('/social', saveSocial);
router.put('/social/:id', saveSocial);
router.delete('/social/:id', removeSocial);

router.get('/about', getAbout);
router.put('/about', saveAbout);

router.post('/seed', async (_req, res) => {
  await seedContent(true);
  return res.json({ success: true });
});

export default router;
