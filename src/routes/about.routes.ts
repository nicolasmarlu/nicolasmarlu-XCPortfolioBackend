import { Router } from 'express';
import {getAboutInfo} from '../controllers/about.controller';

const router = Router();
router.get('/', getAboutInfo);
export default router;
