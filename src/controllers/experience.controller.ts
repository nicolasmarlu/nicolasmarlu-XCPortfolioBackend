import { Request, Response } from 'express';

import { experiencesES,experiencesEN } from '../data/experiences';

export const getExperiences = (
  req: Request,
  res: Response
) => {
  const language = req.headers['accept-language'];

  if (language === 'en') res.json(experiencesEN);
  else res.json(experiencesES);
};