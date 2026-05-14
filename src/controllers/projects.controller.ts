import { Request, Response } from 'express';

import { ProProducts,PersonalProducts } from '../data/projects';

export const getProfessionalProducts = (
  req: Request,
  res: Response
) => {

  res.json(ProProducts);

};

export const getPersonalProducts = (
  req: Request,
  res: Response
) => {

  res.json(PersonalProducts);

};