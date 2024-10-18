import { TAuthor } from "./userTypes";

export type TArticle = {
  id: number;
  author: TAuthor;
  title: string;
  slug: string;
  content: string;
  created: string;
  updated: string;
  image: string;
};

export type TNewArticle = {
  title: string;
  content: string;
  image: File | null;
};
