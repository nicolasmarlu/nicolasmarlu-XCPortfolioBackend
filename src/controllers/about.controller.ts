import { Request, Response } from 'express';
import { socialMediaEN, socialMediaES } from '../data/social';
import { AboutEN,AboutES } from '../data/about';

export const getAboutInfo = (req: Request,res: Response) => {
  const language = req.headers['accept-language'];

  if (language === 'en') res.json(AboutEN);
  else res.json(AboutES);
};