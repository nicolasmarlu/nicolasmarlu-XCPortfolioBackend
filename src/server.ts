import app from './app';
import { connectDatabase } from './v2/config/database';

const PORT = process.env.PORT || 3000;

connectDatabase()
  .catch((error) => {
    console.error('MongoDB connection failed for V2:', error);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  });
