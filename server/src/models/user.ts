import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'USER' | 'SUPERVISOR' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdBy?: mongoose.Types.ObjectId;
  softDeleted: boolean;
  languages?: string[];
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['USER', 'SUPERVISOR', 'ADMIN', 'SUPER_ADMIN'], 
      default: 'USER' 
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
      default: 'ACTIVE'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    softDeleted: { type: Boolean, default: false },
    languages: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);