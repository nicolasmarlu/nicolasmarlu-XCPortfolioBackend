import bcrypt from 'bcryptjs';
import { AdminUserModel } from '../models/admin-user.model';

export const seedAdminUser = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is not configured. Admin seed skipped.');
    return;
  }

  const existing = await AdminUserModel.findOne({ email });

  if (existing) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await AdminUserModel.create({
    email,
    passwordHash,
    displayName: process.env.ADMIN_DISPLAY_NAME || 'Portfolio Admin',
    isActive: true,
  });
};
