import { api } from "./api";

import { TArticle, TNewArticle } from "../models/articlesTypes";

export const loadArticles = async (): Promise<TArticle[]> => {
  return await api("GET", "articles");
};

export const loadArticle = async (id: number): Promise<TArticle> => {
  return await api("GET", `articles/${id}`);
};

export const addArticle = async (data: FormData): Promise<TNewArticle> => {
  return await api("POST", "articles", data, true);
};

export const updateArticle = async (
  id: number,
  data: FormData,
): Promise<TNewArticle> => {
  return await api("PUT", `articles/${id}`, data, true);
};

export const deleteArticle = async (id: number): Promise<void> => {
  return await api("DELETE", `articles/${id}`);
};
