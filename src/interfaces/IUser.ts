export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

export interface IUserRegisterDTO {
  email: string;
  password: string;
  name: string;
}