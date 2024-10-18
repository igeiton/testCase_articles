import { TAuthor } from "./userTypes";

export type TComment = {
  id: number;
  author: TAuthor;
  content: "test";
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
