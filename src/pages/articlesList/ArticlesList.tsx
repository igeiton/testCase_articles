import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField } from "@mui/material";

import { ArticleCard } from "../../components/articleCard/ArticleCard";
import { Loading } from "../../components/loading/Loading";

import { store } from "../../store/Store";

import styles from "./ArticlesList.module.scss";
import { FileUploader } from "../../components/fileUploader/FileUploader";

export const ArticlesList: FC = observer(() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState<File | string>("");

  const { isLoading, articles, loadArticles, addArticle } = store.articlesStore;

  const handleAddNewArticle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (img) {
        formData.append("image", img);
      }

      addArticle(formData).then(() => loadArticles(false));
    },
    [title, content, img, loadArticles, addArticle],
  );

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (isLoading) return <Loading />;

  if (!articles) return; // error

  return (
    <div className={styles.article_list}>
      <form
        name="newArticle"
        encType="multipart/form-data"
        className={styles.form}
      >
        <span>New article:</span>

        <TextField
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <TextField
          type="text"
          label="Content"
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.input}
        />

        <FileUploader setFile={setImg} defaultFile={""} />

        <Button
          variant="contained"
          onClick={handleAddNewArticle}
          className={styles.button}
        >
          Add new article
        </Button>
      </form>

      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} clippedContent />
      ))}
    </div>
  );
});
