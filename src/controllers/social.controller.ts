import { Request, Response } from 'express';

import { socialmedia } from '../data/social';

export const getSocialMedia = (
  req: Request,
  res: Response
) => {

  res.json(socialmedia);

};