import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/database';
import { AdminUserModel } from '../models/admin-user.model';

const run = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to reset the admin password.');
  }

  await connectDatabase();

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await AdminUserModel.findOneAndUpdate(
    { email },
    {
      email,
      passwordHash,
      displayName: process.env.ADMIN_DISPLAY_NAME || 'Portfolio Admin',
      isActive: true,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  console.log(`Admin password reset completed for ${admin.email}.`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
