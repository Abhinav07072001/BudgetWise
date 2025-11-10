import mongoose, { Schema } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  passwordHash: string;
  role: 'user' | 'admin';
  currency: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    currency: { type: String, default: 'INR' }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
