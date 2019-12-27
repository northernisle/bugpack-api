export default interface IJWToken<T> {
  data: T;
  iat: number;
  exp: Date;
  expired: boolean;
}