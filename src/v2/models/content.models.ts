import { Schema, model, Document } from 'mongoose';

export type Locale = 'es' | 'en';
export type ProjectType = 'professional' | 'personal';

const commonOptions = {
  timestamps: true,
  versionKey: false as const,
};

export interface ExperienceDocument extends Document {
  locale: Locale;
  company: string;
  role: string;
  year: string;
  description: string;
  tags: string[];
  logoUrl: string;
  companyUrl: string;
  order: number;
  isPublished: boolean;
}

export interface ProjectDocument extends Document {
  type: ProjectType;
  locale: Locale;
  category: string;
  title: string;
  description: string;
  tags: string[];
  logoUrl: string;
  projectUrl: string;
  order: number;
  isPublished: boolean;
}

export interface AboutDocument extends Document {
  locale: Locale;
  aboutSections: Array<{
    title: string;
    paragraphs: string[];
    stack: string[];
    order: number;
    isPublished: boolean;
  }>;
  profileInfo: Array<{
    label: string;
    value: string;
    order: number;
    isPublished: boolean;
  }>;
}

export interface SocialDocument extends Document {
  locale: Locale;
  label: string;
  value: string;
  link: string;
  description: string;
  order: number;
  isPublished: boolean;
}

const experienceSchema = new Schema<ExperienceDocument>({
  locale: { type: String, enum: ['es', 'en'], required: true, index: true },
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  year: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  logoUrl: { type: String, default: '' },
  companyUrl: { type: String, default: '' },
  order: { type: Number, default: 0, index: true },
  isPublished: { type: Boolean, default: true, index: true },
}, commonOptions);

const projectSchema = new Schema<ProjectDocument>({
  type: { type: String, enum: ['professional', 'personal'], required: true, index: true },
  locale: { type: String, enum: ['es', 'en'], required: true, index: true },
  category: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  logoUrl: { type: String, default: '' },
  projectUrl: { type: String, default: '' },
  order: { type: Number, default: 0, index: true },
  isPublished: { type: Boolean, default: true, index: true },
}, commonOptions);

const aboutSectionSchema = new Schema({
  title: { type: String, required: true, trim: true },
  paragraphs: { type: [String], default: [] },
  stack: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { _id: false });

const profileInfoSchema = new Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { _id: false });

const aboutSchema = new Schema<AboutDocument>({
  locale: { type: String, enum: ['es', 'en'], required: true, unique: true },
  aboutSections: { type: [aboutSectionSchema], default: [] },
  profileInfo: { type: [profileInfoSchema], default: [] },
}, commonOptions);

const socialSchema = new Schema<SocialDocument>({
  locale: { type: String, enum: ['es', 'en'], required: true, index: true },
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0, index: true },
  isPublished: { type: Boolean, default: true, index: true },
}, commonOptions);

export const ExperienceModel = model<ExperienceDocument>('ExperienceV2', experienceSchema);
export const ProjectModel = model<ProjectDocument>('ProjectV2', projectSchema);
export const AboutModel = model<AboutDocument>('AboutV2', aboutSchema);
export const SocialModel = model<SocialDocument>('SocialV2', socialSchema);
