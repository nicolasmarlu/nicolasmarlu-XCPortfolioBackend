import { AboutEN, AboutES } from '../../data/about';
import { experiencesEN, experiencesES } from '../../data/experiences';
import { PersonalProductsEN, PersonalProductsES, ProProductsEN, ProProductsES } from '../../data/projects';
import { socialMediaEN, socialMediaES } from '../../data/social';
import { AboutModel, ExperienceModel, ProjectModel, SocialModel } from '../models/content.models';

type Locale = 'es' | 'en';

const companyLinks: Record<string, string> = {
  'Apex Systems': 'https://www.apexsystems.com',
  'Robert Bosch': 'https://www.bosch.com',
};

const toExperienceSeed = (items: Array<any>, locale: Locale) =>
  items.map((item, index) => ({
    ...item,
    locale,
    logoUrl: '',
    companyUrl: companyLinks[item.company] ?? '',
    order: index + 1,
    isPublished: true,
  }));

const toProjectSeed = (items: Array<any>, locale: Locale, type: 'professional' | 'personal') =>
  items.map((item, index) => ({
    ...item,
    type,
    locale,
    logoUrl: '',
    projectUrl: '',
    order: index + 1,
    isPublished: true,
  }));

const toSocialSeed = (items: Array<any>, locale: Locale) =>
  items.map((item, index) => ({
    ...item,
    locale,
    order: index + 1,
    isPublished: true,
  }));

const toAboutSeed = (about: any, locale: Locale) => ({
  locale,
  aboutSections: about.aboutSections.map((section: any, index: number) => ({
    title: section.title,
    paragraphs: section.paragraphs ?? [],
    stack: section.stack ?? [],
    order: index + 1,
    isPublished: true,
  })),
  profileInfo: about.profileInfo.map((item: any, index: number) => ({
    label: item.label,
    value: item.value,
    order: index + 1,
    isPublished: true,
  })),
});

export const seedContent = async (force = false): Promise<void> => {
  const existingExperiences = await ExperienceModel.countDocuments();

  if (existingExperiences > 0 && !force) {
    return;
  }

  if (force) {
    await Promise.all([
      ExperienceModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      AboutModel.deleteMany({}),
      SocialModel.deleteMany({}),
    ]);
  }

  await Promise.all([
    ExperienceModel.insertMany([
      ...toExperienceSeed(experiencesES, 'es'),
      ...toExperienceSeed(experiencesEN, 'en'),
    ]),
    ProjectModel.insertMany([
      ...toProjectSeed(ProProductsES, 'es', 'professional'),
      ...toProjectSeed(ProProductsEN, 'en', 'professional'),
      ...toProjectSeed(PersonalProductsES, 'es', 'personal'),
      ...toProjectSeed(PersonalProductsEN, 'en', 'personal'),
    ]),
    AboutModel.insertMany([
      toAboutSeed(AboutES, 'es'),
      toAboutSeed(AboutEN, 'en'),
    ]),
    SocialModel.insertMany([
      ...toSocialSeed(socialMediaES, 'es'),
      ...toSocialSeed(socialMediaEN, 'en'),
    ]),
  ]);
};
