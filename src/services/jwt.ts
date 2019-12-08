import jwt, { JwtHeader } from 'jsonwebtoken';

const secret: string = <string>process.env.JWT_SECRET;

export default {
  sign: (payload: object, options?: object): Promise<string> => {
    const promise = new Promise<string>((resolve, reject) => {
      jwt.sign(payload, secret, options || { expiresIn: '30d' }, (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token);
      });
    });

    return promise;
  },

  verify: <T>(token: string): Promise<T> => {
    const promise = new Promise<T | any>((resolve, reject) => {
      jwt.verify(token, secret, undefined, (err, payload) => {
        if (err) {
          return reject(err);
        }

        return resolve(payload);
      });
    });

    return promise;
  }
}