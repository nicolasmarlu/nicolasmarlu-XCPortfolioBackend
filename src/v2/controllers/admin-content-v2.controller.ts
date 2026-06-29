import { Request, Response } from 'express';
import { AboutModel, ExperienceModel, Locale, ProjectModel, ProjectType, SocialModel } from '../models/content.models';

const sortByContentOrder = { locale: 1, order: 1, createdAt: 1 } as const;

const normalizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) {
    return tags.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
};

const pickLocale = (value: unknown): Locale => value === 'en' ? 'en' : 'es';
const pickProjectType = (value: unknown): ProjectType => value === 'personal' ? 'personal' : 'professional';

export const listExperiences = async (req: Request, res: Response) => {
  const filter: Partial<{ locale: Locale }> = req.query.locale ? { locale: pickLocale(req.query.locale) } : {};
  const items = await ExperienceModel.find(filter).sort(sortByContentOrder);
  return res.json(items);
};

export const saveExperience = async (req: Request, res: Response) => {
  const payload = {
    locale: pickLocale(req.body.locale),
    company: req.body.company,
    role: req.body.role,
    year: req.body.year,
    description: req.body.description,
    tags: normalizeTags(req.body.tags),
    logoUrl: req.body.logoUrl || '',
    companyUrl: req.body.companyUrl || '',
    order: Number(req.body.order ?? 0),
    isPublished: Boolean(req.body.isPublished),
  };

  const item = req.params.id
    ? await ExperienceModel.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    : await ExperienceModel.create(payload);

  return res.status(req.params.id ? 200 : 201).json(item);
};

export const removeExperience = async (req: Request, res: Response) => {
  await ExperienceModel.findByIdAndDelete(req.params.id);
  return res.status(204).send();
};

export const listProjects = async (req: Request, res: Response) => {
  const filter: Partial<{ locale: Locale; type: ProjectType }> = {};
  if (req.query.locale) filter.locale = pickLocale(req.query.locale);
  if (req.query.type === 'professional' || req.query.type === 'personal') filter.type = req.query.type;
  const items = await ProjectModel.find(filter).sort(sortByContentOrder);
  return res.json(items);
};

export const saveProject = async (req: Request, res: Response) => {
  const payload = {
    type: pickProjectType(req.body.type),
    locale: pickLocale(req.body.locale),
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    tags: normalizeTags(req.body.tags),
    logoUrl: req.body.logoUrl || '',
    projectUrl: req.body.projectUrl || '',
    order: Number(req.body.order ?? 0),
    isPublished: Boolean(req.body.isPublished),
  };

  const item = req.params.id
    ? await ProjectModel.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    : await ProjectModel.create(payload);

  return res.status(req.params.id ? 200 : 201).json(item);
};

export const removeProject = async (req: Request, res: Response) => {
  await ProjectModel.findByIdAndDelete(req.params.id);
  return res.status(204).send();
};

export const listSocial = async (req: Request, res: Response) => {
  const filter: Partial<{ locale: Locale }> = req.query.locale ? { locale: pickLocale(req.query.locale) } : {};
  const items = await SocialModel.find(filter).sort(sortByContentOrder);
  return res.json(items);
};

export const saveSocial = async (req: Request, res: Response) => {
  const payload = {
    locale: pickLocale(req.body.locale),
    label: req.body.label,
    value: req.body.value,
    link: req.body.link,
    description: req.body.description || '',
    order: Number(req.body.order ?? 0),
    isPublished: Boolean(req.body.isPublished),
  };

  const item = req.params.id
    ? await SocialModel.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    : await SocialModel.create(payload);

  return res.status(req.params.id ? 200 : 201).json(item);
};

export const removeSocial = async (req: Request, res: Response) => {
  await SocialModel.findByIdAndDelete(req.params.id);
  return res.status(204).send();
};

export const getAbout = async (req: Request, res: Response) => {
  const locale = pickLocale(req.query.locale);
  const about = await AboutModel.findOne({ locale });
  return res.json(about);
};

export const saveAbout = async (req: Request, res: Response) => {
  const locale = pickLocale(req.body.locale);
  const payload = {
    locale,
    aboutSections: (req.body.aboutSections ?? []).map((section: any, index: number) => ({
      title: section.title,
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs : [],
      stack: normalizeTags(section.stack),
      order: Number(section.order ?? index + 1),
      isPublished: Boolean(section.isPublished),
    })),
    profileInfo: (req.body.profileInfo ?? []).map((item: any, index: number) => ({
      label: item.label,
      value: item.value,
      order: Number(item.order ?? index + 1),
      isPublished: Boolean(item.isPublished),
    })),
  };

  const about = await AboutModel.findOneAndUpdate({ locale }, payload, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  return res.json(about);
};

export const getStats = async (_req: Request, res: Response) => {
  const [
    experiences,
    publishedExperiences,
    projects,
    publishedProjects,
    social,
    about,
  ] = await Promise.all([
    ExperienceModel.countDocuments(),
    ExperienceModel.countDocuments({ isPublished: true }),
    ProjectModel.countDocuments(),
    ProjectModel.countDocuments({ isPublished: true }),
    SocialModel.countDocuments(),
    AboutModel.countDocuments(),
  ]);

  return res.json({
    experiences,
    publishedExperiences,
    projects,
    publishedProjects,
    social,
    about,
    updatedAt: new Date().toISOString(),
  });
};
