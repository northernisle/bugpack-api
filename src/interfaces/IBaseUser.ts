export default interface IBaseUser {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}
