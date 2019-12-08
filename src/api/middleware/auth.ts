import { Request, Response, NextFunction } from 'express';
import User from '../../models/mongoose/user';
import jwt from '../../services/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.header('Authorization')!.replace('Bearer', '');
    const decodedData = await jwt.verify<{ _id: string}>(token);

    const user = await User.findOne({ _id: decodedData._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send();
  }
}