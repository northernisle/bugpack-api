import { Request, Response, NextFunction } from 'express';
import User from '../../models/mongoose/user';
import jwt from '../../services/jwt';
import daysBetween from '../../utils/daysBetween';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = <string>req.header('Authorization')!.replace('Bearer ', '');
    const { data, exp, expired } = await jwt.verify<{ _id: string, rememberMe: boolean }>(token);

    if (expired) {
      const expiryPeriod = data.rememberMe ? 7 : 1;
      if (daysBetween(new Date(), exp) >= expiryPeriod) { // inactivity for longer than the expiry period
        throw new Error();
      }
    }

    const user = await User.findOne({ _id: data._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    if (expired) {
      const index = user.tokens.findIndex(dbToken => dbToken.token === token);
      token = await jwt.sign(data);
      user.tokens[index].token = token;
      await user.save();
      req.tokenUpdated = true;
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send();
  }
}