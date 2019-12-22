import { Types } from 'mongoose';

export interface IBaseUser {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

export interface IUser extends IBaseUser {
  _id: string;
}

export interface IUserRegisterDTO {
  email: string;
  password: string;
  name: string;
}