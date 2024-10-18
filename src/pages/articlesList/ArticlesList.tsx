import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { ArticleCard } from "../../components/articleCard/ArticleCard";

import { store } from "../../store/Store";

import styles from "./ArticlesList.module.scss";

export const ArticlesList: FC = observer(() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const { isLoading, articles, loadArticles, addArticle } = store.articlesStore;

  const handleAddNewArticle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (img) {
      formData.append("image", img);
    }

    addArticle(formData).then(() => loadArticles(false));
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImg(e.target.files[0]);
    } else {
      setImg(null);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (isLoading) return <div>Loading...</div>; // loader

  if (!articles) return; // error

  return (
    <div className={styles.article_list}>
      <form
        name="newArticle"
        encType="multipart/form-data"
        className={styles.form}
      >
        <div>New article:</div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input type="file" onChange={handleUploadFile} />

        <button onClick={handleAddNewArticle}>Add</button>
      </form>

      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} clippedContent />
      ))}
    </div>
  );
});
