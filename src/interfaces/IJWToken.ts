export default interface IJWToken<T> {
  data: T;
  iat: number;
  exp: number;
}