import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { ArticleCard } from "../../components/articleCard/ArticleCard";
import { Comments } from "../../components/comments/Comments";

import { store } from "../../store/Store";

import styles from "./ArticlePage.module.scss";

export const ArticlePage: FC = observer(() => {
  const { id } = useParams();

  const { isLoading, article, comments, loadArticle } = store.articlesStore;

  const { userId } = store.authStore;

  const idNumber = Number(id) || null;

  useEffect(() => {
    if (idNumber) loadArticle(idNumber);
  }, [idNumber, loadArticle]);

  if (isLoading) return <div>Loading...</div>;

  if (!idNumber || !article) return <div>Page 404</div>;

  return (
    <div className={styles.wrapper}>
      <ArticleCard article={article} userId={userId} />

      <Comments comments={comments || []} />
    </div>
  );
});
