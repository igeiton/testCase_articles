import { ArticlesStore } from "./ArticlesStore";
import { AuthStore } from "./AuthStore";

class Store {
  authStore: AuthStore;

  articlesStore: ArticlesStore;

  constructor() {
    this.authStore = new AuthStore();

    this.articlesStore = new ArticlesStore();
  }
}

export const store = new Store();
