import { Document } from 'mongoose';
import { IUser } from '../../interfaces';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      token: string;
    }
  }
}