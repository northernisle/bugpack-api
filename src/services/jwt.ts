import jwt from 'jsonwebtoken';

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

  verify: <T>(token: string): Promise<T> => new Promise<T | any>((resolve, reject) => {
    jwt.verify(token, secret, undefined, (err, payload) => {
      if (err) {
        return reject(err);
      }

      return resolve(payload);
    });
  })
}