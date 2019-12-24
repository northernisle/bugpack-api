import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import IUser from '../../interfaces/IUser';

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
    validate(value: any): boolean {
      return validator.isEmail(value);
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

User.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
}

User.pre('save', async function (next) {
  const user = <IUser>this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

export default mongoose.model<IUser>('User', User);