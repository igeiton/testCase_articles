import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_REFRESH_TOKEN,
} from "../configs/localStorage";

import {
  clearLocalStorage,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

import { store } from "../store/Store";

export type TRefreshResponse = {
  access: string;
};

export const api = async <T>(
  method: "POST" | "GET" | "PUT",
  path: string,
  data?: object,
  defaultHeaders?: boolean,
): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}/`, {
    method,
    headers: defaultHeaders ? getDefaultHeaders() : getHeaders(),
    body: getBody(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      refresh();
    }

    const errorResponse = await response.json();
    throw { error: new Error(errorResponse), message: errorResponse };
  }

  const content = await response.text();

  const token = loadFromLocalStorage(STORAGE_ACCESS_TOKEN);

  if (token) {
    // id from token
    const userInfo = atob(token.split(".")[1]);
    const { user_id } = JSON.parse(userInfo);

    store.authStore.setUserId(user_id);
  } else {
    store.authStore.setUserId(null);
  }

  return JSON.parse(content);
};

const getDefaultHeaders = () => {
  return {
    Authorization: `Bearer ${loadFromLocalStorage(STORAGE_ACCESS_TOKEN)}`,
  };
};

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${loadFromLocalStorage(STORAGE_ACCESS_TOKEN)}`,
  };
};

const getBody = (data?: object) => {
  if (data instanceof FormData) {
    return data;
  }

  return typeof data === "object" ? JSON.stringify(data) : undefined;
};

const refresh = async () => {
  try {
    const refreshToken = loadFromLocalStorage(STORAGE_REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const { access } = await api<TRefreshResponse>("POST", "token/refresh", {
      data: refreshToken,
    });

    saveToLocalStorage(STORAGE_ACCESS_TOKEN, access);
  } catch (error) {
    clearLocalStorage();
    throw error;
  }
};
