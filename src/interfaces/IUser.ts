import IBaseUser from "./IBaseUser";
import { Document } from "mongoose";

export default interface IUser extends IBaseUser, Document { }