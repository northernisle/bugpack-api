import { Types } from "mongoose";
import { IBaseUser } from "../../interfaces/IUser";

export interface IUser extends IBaseUser {
  _id: Types.ObjectId
}