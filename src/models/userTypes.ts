export type TUserChangePassword = {
  old_password: string;
  password: string;
  confirmed_password: string;
};

export type TAuthor = {
  id: number;
  username: string;
  email: string;
};
