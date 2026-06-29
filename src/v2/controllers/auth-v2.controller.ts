import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import validator from 'validator';
import { AdminUserModel } from '../models/admin-user.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ success: false, message: 'JWT_SECRET is not configured.' });
  }

  if (!email || !password || !validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid credentials.' });
  }

  const admin = await AdminUserModel.findOne({
    email: String(email).trim().toLowerCase(),
    isActive: true,
  });

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const isValid = await bcrypt.compare(String(password), admin.passwordHash);

  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const signOptions: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '8h') as SignOptions['expiresIn'] };

  const token = jwt.sign(
    { sub: admin.id, email: admin.email },
    jwtSecret,
    signOptions
  );

  return res.json({
    success: true,
    token,
    user: {
      id: admin.id,
      email: admin.email,
      displayName: admin.displayName,
    },
  });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, user: req.admin });
};
