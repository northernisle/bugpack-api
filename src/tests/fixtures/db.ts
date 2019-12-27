import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../../models/mongoose/user';
import { IUser } from '../models/IUser';

const dbUserId = new mongoose.Types.ObjectId();
const dbUser: IUser = {
  _id: dbUserId,
  name: 'Rhys',
  email: 'rhys@atlas.com',
  password: 'Rhysball',
  tokens: [{
    token: jwt.sign({
      _id: dbUserId
    }, <string>process.env.JWT_SECRET, { expiresIn: '15min' })
  }]
};

const initDatabase = async () => {
  await User.deleteMany(undefined);
  await new User(dbUser).save();
};

export {
  initDatabase,
  dbUserId,
  dbUser
}