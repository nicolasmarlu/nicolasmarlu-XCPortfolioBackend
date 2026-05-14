import { Request, Response } from 'express';

import { experiences } from '../data/experiences';

export const getExperiences = (
  req: Request,
  res: Response
) => {

  res.json(experiences);

};