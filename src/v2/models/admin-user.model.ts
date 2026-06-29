import { Schema, model, Document } from 'mongoose';

export interface AdminUserDocument extends Document {
  email: string;
  passwordHash: string;
  displayName: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

const adminUserSchema = new Schema<AdminUserDocument>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, default: 'Portfolio Admin' },
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date },
}, {
  timestamps: true,
  versionKey: false,
});

export const AdminUserModel = model<AdminUserDocument>('AdminUserV2', adminUserSchema);
