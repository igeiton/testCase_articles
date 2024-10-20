import { api } from "./api";

import { TComment, TNewComment } from "../models/commentsTypes";

export const loadComments = async (id: number): Promise<TComment[]> => {
  return await api("GET", `articles/${id}/comments`);
};

export const addComment = async (id: number, data: TNewComment) => {
  return await api("POST", `articles/${id}/comments`, { ...data });
};

export const updateComment = async (
  articleId: number,
  commentId: number,
  data: TNewComment,
): Promise<TComment> => {
  return await api("PUT", `articles/${articleId}/comments/${commentId}`, {
    ...data,
  });
};

export const deleteComment = async (
  articleId: number,
  commentId: number,
): Promise<void> => {
  return await api("DELETE", `articles/${articleId}/comments/${commentId}`);
};
