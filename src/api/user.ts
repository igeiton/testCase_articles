import { TUserChangePassword } from "../models/userTypes";

import { api } from "./api";

export const changePassword = async (data: TUserChangePassword) => {
  return await api("PUT", "change-password", { ...data });
};
