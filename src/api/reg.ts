import { TReg } from "../models/regTypes";

import { api } from "./api";

export const registration = async (data: TReg) => {
  return await api("POST", "registration", { ...data });
};
