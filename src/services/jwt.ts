import jwt from 'jsonwebtoken';
import { IJWToken } from '../interfaces';

const secret: string = <string>process.env.JWT_SECRET;

export default {
  sign: (payload: object, options?: object): Promise<string> => new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options ?? { expiresIn: '1d' }, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    });
  }),

  verify: <T>(token: string): Promise<IJWToken<T>> => new Promise<IJWToken<T> | any>((resolve, reject) => {
    jwt.verify(token, secret, undefined, (err, payload) => {
      if (err) {
        return reject(err);
      }

      const { iat, exp, ...data } = <any>payload;
      const token: IJWToken<T> = { data, iat, exp };

      return resolve(token);
    });
  })
}