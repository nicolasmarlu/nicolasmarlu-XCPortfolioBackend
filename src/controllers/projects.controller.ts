import { Request, Response } from 'express';

import { ProProductsES,ProProductsEN, PersonalProductsEN, PersonalProductsES } from '../data/projects';

export const getProfessionalProducts = (req: Request,res: Response) => {
  const language = req.headers['accept-language'];
  if (language === 'en') res.json(ProProductsEN);
  else res.json(ProProductsES);
};

export const getPersonalProducts = (req: Request, res: Response) => {
  const language = req.headers['accept-language'];
  if (language === 'en') res.json(PersonalProductsEN);
  else res.json(PersonalProductsES);
};