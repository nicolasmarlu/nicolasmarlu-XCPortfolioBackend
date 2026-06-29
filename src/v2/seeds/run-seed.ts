import 'dotenv/config';
import { connectDatabase } from '../config/database';
import { seedAdminUser } from './admin.seed';
import { seedContent } from './content.seed';

const run = async (): Promise<void> => {
  await connectDatabase();
  await seedContent(process.argv.includes('--force'));
  await seedAdminUser();
  console.log('Portfolio Admin V2 seed completed.');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
