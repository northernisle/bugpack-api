import { IUser, IUserRegisterDTO } from "../interfaces/IUser";
import User from '../models/user';
import { RequestError } from "../models/requestError";

export default class UserService {
  public static async register(userDTO: IUserRegisterDTO): Promise<IUser> {
    try {
      const user = new User(userDTO);
      await user.save();

      return user;
    } catch (e) {
      throw new RequestError(400, e);
    }
  }
}