import { makeAutoObservable } from "mobx";

import { TArticle } from "../models/articlesTypes";

import {
  addArticle,
  loadArticle,
  loadArticles,
  updateArticle,
} from "../api/articles";
import { loadComments } from "../api/comments";
import { TComment } from "../models/commentsTypes";

export class ArticlesStore {
  isLoading = false;

  articles: TArticle[] | null = null;
  article: TArticle | null = null;

  comments: TComment[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadArticles = async (withLoading: boolean = true) => {
    if (withLoading) {
      this.setLoading(true);
    }

    return await loadArticles()
      .then(this.setArticles)
      .finally(() => this.setLoading(false));
  };

  loadArticle = async (id: number, withLoading: boolean = true) => {
    if (withLoading) {
      this.setLoading(true);
    }

    return await Promise.all([loadArticle(id), this.loadComments(id)])
      .then(([article]) => {
        this.setArticle(article);
      })
      .finally(() => this.setLoading(false));
  };

  updateArticle = async (
    id: number,
    data: FormData,
    withLoading: boolean = true,
  ) => {
    if (withLoading) {
      this.setLoading(true);
    }

    return await updateArticle(id, data).finally(() => this.setLoading(false));
  };

  addArticle = async (newArticle: FormData) => {
    return await addArticle(newArticle);
  };

  loadComments = async (id: number) => {
    return await loadComments(id).then((response) =>
      this.setComments(response),
    );
  };

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setArticles = (articles: TArticle[]) => {
    this.articles = articles;
  };

  setArticle = (article: TArticle) => {
    this.article = article;
  };

  setComments = (comments: TComment[]) => {
    this.comments = comments;
  };
}
