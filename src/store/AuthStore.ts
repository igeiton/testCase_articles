import { makeAutoObservable } from "mobx";

import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_PATH,
  STORAGE_REFRESH_TOKEN,
} from "../configs/localStorage";

import { TAuthData } from "../models/authTypes";

import { auth } from "../api/auth";

export class AuthStore {
  isLoading: boolean = false;

  accessToken: string | null;
  refreshToken: string | null;

  userId: number | null = null;

  constructor() {
    makeAutoObservable(this);

    this.accessToken = loadFromLocalStorage("accessToken");
    this.refreshToken = loadFromLocalStorage("refreshToken");
  }

  get isAuthorized(): boolean {
    return !!(this.accessToken && this.refreshToken);
  }

  checkTokens = () => {
    if (!this.isAuthorized) {
      removeFromLocalStorage(STORAGE_PATH);
    }
  };

  loadTokens = async (data: TAuthData) => {
    this.setLoading(true);

    return await auth(data)
      .then((response) => {
        this.setAccessToken(response.access);
        this.setRefreshToken(response.refresh);
      })
      .finally(() => this.setLoading(false));
  };

  logOut = () => {
    this.accessToken = null;
    this.refreshToken = null;
    removeFromLocalStorage(STORAGE_ACCESS_TOKEN);
    removeFromLocalStorage(STORAGE_REFRESH_TOKEN);
  };

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
    saveToLocalStorage(STORAGE_ACCESS_TOKEN, accessToken);
  };

  setRefreshToken = (refreshToken: string) => {
    this.refreshToken = refreshToken;
    saveToLocalStorage(STORAGE_REFRESH_TOKEN, refreshToken);
  };

  setUserId = (userId: number | null) => {
    this.userId = userId;
  };
}
