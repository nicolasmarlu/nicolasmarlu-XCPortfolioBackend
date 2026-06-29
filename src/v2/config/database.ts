import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MONGO_URI is not configured. V2 endpoints will require MongoDB to be available.');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for Portfolio Admin V2.');
};

export const isDatabaseConnected = (): boolean => mongoose.connection.readyState === 1;
