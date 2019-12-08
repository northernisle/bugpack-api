import { IUser } from "../../interfaces/IUser";
import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user: IUser & Document;
      token: string;
    }
  }
}