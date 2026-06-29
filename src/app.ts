import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import experienceRoutes from './routes/experience.route';
import projectsRoutes from './routes/projects.routes';
import contactRoutes from './routes/contacts.routes';
import socialRoutes from './routes/social.routes';
import aboutRoutes from './routes/about.routes';
import adminV2Routes from './v2/routes/admin-v2.routes';
import authV2Routes from './v2/routes/auth-v2.routes';
import publicV2Routes from './v2/routes/public-v2.routes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();

// app.use(cors({
//   origin: [
//     'http://localhost:4200',
//     'https://xc-portfolio-git-develop-nicolasmarluprojects.vercel.app',
//     'https://xc-portfolio-fsdhwuovh-nicolasmarluprojects.vercel.app',
//     'https://xc-portfolio-blush.vercel.app/',
//     'https://xcportfolio-api.onrender.com'
//   ]
// }));

app.use(cors());

app.use(express.json());
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/v2/auth', authV2Routes);
app.use('/api/v2/admin', adminV2Routes);
app.use('/api/v2', publicV2Routes);
app.use(helmet());

const contactLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'Too many requests. Please try again later.'
  }
});

app.use('/api/contact', contactLimiter, contactRoutes);

export default app;
