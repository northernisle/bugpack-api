import { Error } from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/mongoose/user';
import { RequestError } from "../models/requestError";
import jwt from './jwt';
import { IUserRegister, IUser, IUserLogin } from '../interfaces';

export default {
  register: async (userDTO: IUserRegister): Promise<{ user: IUser, token: string }> => {
    try {
      const user = new User(userDTO);
      await user.save();

      const token = await jwt.sign({ _id: user._id });

      user.tokens = user.tokens.concat({ token });
      await user.save();

      return { user, token };
    } catch (e) {
      throw new RequestError(400, e);
    }
  },
  signIn: async (userDTO: IUserLogin) => {
    try {
      const user = await User.findOne({ email: userDTO.email });

      if (!user) {
        throw new Error('Unable to login');
      }

      const passwordMatches = await bcrypt.compare(userDTO.password, user.password);

      if (!passwordMatches) {
        throw new Error('Unable to login');
      }

      const expiresIn = userDTO.rememberMe ? '30d' : '1d';
      const token = await jwt.sign({ _id: user._id }, { expiresIn });

      user.tokens = user.tokens.concat({ token });
      await user.save();

      return { user, token };
    } catch (e) {
      throw new RequestError(400, e);
    }
  },
  signOut: async (userDTO: IUser, token: string): Promise<void> => {
    try {
      userDTO.tokens = userDTO.tokens.filter(userToken => userToken.token !== token);
      await userDTO.save();
    } catch (e) {
      throw new RequestError(500);
    }
  },
  emailOccupied: async (email: string): Promise<boolean> => {
    try {
      const result = await User.findOne({ email }, 'email');
      return result != null && result.email != null;
    } catch (e) {
      throw new RequestError(500);
    }
  }
}