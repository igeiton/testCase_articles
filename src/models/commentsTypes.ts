import { TAuthor } from "./userTypes";

export type TComment = {
  id: number;
  author: TAuthor;
  content: string;
  created: string;
  updated: string;
  article: number;
  parent: null;
  children: TComment[];
};

export type TNewComment = {
  content: string;
  parent: number | null;
};
