import { Request, Response } from 'express';
import { AboutModel, ExperienceModel, ProjectModel, SocialModel } from '../models/content.models';

const getLocale = (req: Request) => req.headers['accept-language'] === 'en' ? 'en' : 'es';

export const getExperiencesV2 = async (req: Request, res: Response) => {
  const items = await ExperienceModel
    .find({ locale: getLocale(req), isPublished: true })
    .sort({ order: 1, createdAt: 1 });

  return res.json(items);
};

export const getProfessionalProjectsV2 = async (req: Request, res: Response) => {
  const items = await ProjectModel
    .find({ locale: getLocale(req), type: 'professional', isPublished: true })
    .sort({ order: 1, createdAt: 1 });

  return res.json(items);
};

export const getPersonalProjectsV2 = async (req: Request, res: Response) => {
  const items = await ProjectModel
    .find({ locale: getLocale(req), type: 'personal', isPublished: true })
    .sort({ order: 1, createdAt: 1 });

  return res.json(items);
};

export const getSocialV2 = async (req: Request, res: Response) => {
  const items = await SocialModel
    .find({ locale: getLocale(req), isPublished: true })
    .sort({ order: 1, createdAt: 1 });

  return res.json(items);
};

export const getAboutV2 = async (req: Request, res: Response) => {
  const about = await AboutModel.findOne({ locale: getLocale(req) });

  if (!about) {
    return res.json({ aboutSections: [], profileInfo: [] });
  }

  return res.json({
    aboutSections: about.aboutSections
      .filter((section) => section.isPublished)
      .sort((a, b) => a.order - b.order),
    profileInfo: about.profileInfo
      .filter((item) => item.isPublished)
      .sort((a, b) => a.order - b.order),
  });
};
