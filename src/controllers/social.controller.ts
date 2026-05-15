import { Request, Response } from 'express';

import { socialMediaEN, socialMediaES } from '../data/social';

export const getSocialMedia = (
  req: Request,
  res: Response
) => {

  const language = req.headers['accept-language'];

  if (language === 'en') res.json(socialMediaEN);
  else res.json(socialMediaES);
};