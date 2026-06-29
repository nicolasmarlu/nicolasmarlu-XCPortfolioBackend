import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AdminTokenPayload {
  sub: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  admin?: AdminTokenPayload;
}

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  try {
    req.admin = jwt.verify(token, jwtSecret) as AdminTokenPayload;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};
