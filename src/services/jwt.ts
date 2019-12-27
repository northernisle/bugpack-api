import jwt, { SignOptions } from 'jsonwebtoken';
import { IJWToken } from '../interfaces';

const secret: string = <string>process.env.JWT_SECRET;

export default {
  sign: (payload: object, options?: SignOptions): Promise<string> => new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: '15min', ...options }, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    });
  }),

  verify: <T>(token: string): Promise<IJWToken<T>> => new Promise<IJWToken<T> | any>((resolve, reject) => {
    jwt.verify(token, secret, { ignoreExpiration: true }, (err, payload) => {
      if (err) {
        return reject(err);
      }

      const { iat, exp, ...data } = <any>payload;
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(exp);

      const token: IJWToken<T> = {
        data,
        iat,
        exp: expirationDate,
        expired: Date.now() >= exp * 1000
      };

      return resolve(token);
    });
  })
}