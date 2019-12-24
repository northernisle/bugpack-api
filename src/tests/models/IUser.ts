import { Types } from "mongoose";
import { IBaseUser } from "../../interfaces";

export interface IUser extends IBaseUser {
  _id: Types.ObjectId
}