import mongoose from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces/IUser';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate (value: any): boolean {
      return validator.isEmail(value);
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  }
}, {
  timestamps: true
});

export default mongoose.model<mongoose.Document & IUser>('User', User);