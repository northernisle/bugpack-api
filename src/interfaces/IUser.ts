export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserRegisterDTO {
  email: string;
  password: string;
  name: string;
}