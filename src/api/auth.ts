import { TAuthData, TAuthResponse } from "../models/authTypes";

import { api } from "./api";

export const auth = async (user: TAuthData): Promise<TAuthResponse> => {
  return await api("POST", "token", user);
};
