import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { CardInfo } from "../cardInfo/CardInfo";
import { ArticleTitle } from "../common/articleTitle/ArticleTitle";
import { ArticleContent } from "../common/articleContent/ArticleContent";

import { ARTICLES_LIST_PATH } from "../../configs/routes";
import { TArticle } from "../../models/articlesTypes";

import { store } from "../../store/Store";

import styles from "./ArticleCard.module.scss";

type TArticleCardProps = {
  article: TArticle;
  clippedContent?: boolean;
  userId?: number | null;
};

export const ArticleCard: FC<TArticleCardProps> = observer(
  ({ article, clippedContent, userId }) => {
    const navigate = useNavigate();

    const { updateArticle } = store.articlesStore;

    const [isEdit, setEdit] = useState(false);

    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);
    const [img, setImg] = useState<File | string>(article.image);

    const handleChangeEdit = useCallback(() => {
      setEdit((prev) => !prev);
    }, []);

    const handleUpdateArticle = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);

        if (typeof img !== "string") {
          formData.append("image", img);
        }

        updateArticle(article.id, formData, false).then(() => setEdit(false));
      },
      [title, content, img, article.id, updateArticle, setEdit],
    );

    const handleUploadFile = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
          setImg(e.target.files[0]);
        } else {
          setImg(article.content);
        }
      },
      [article.content],
    );

    const handleReset = useCallback(() => {
      setTitle(article.title);
      setContent(article.content);
      setImg(article.image);
      setEdit(false);
    }, [article.title, article.content, article.image]);

    return (
      <div className={styles.article}>
        <div className={styles.article__title}>
          <div className={styles.article__title__image}>
            {img && (
              <img
                src={
                  typeof img === "string"
                    ? img
                    : window.URL.createObjectURL(img)
                }
                alt={article.slug}
              />
            )}
            {isEdit && <input type="file" onChange={handleUploadFile} />}
          </div>

          <form
            encType="multipart/form-data"
            className={styles.article__title__text}
          >
            <ArticleTitle title={title} setTitle={setTitle} isEdit={isEdit} />

            <ArticleContent
              content={content}
              setContent={setContent}
              clippedContent={clippedContent}
              isEdit={isEdit}
            />

            {isEdit && (
              <div className={styles.btns}>
                <button onClick={handleReset}>Cancel</button>
                <button onClick={handleUpdateArticle}>Save</button>
              </div>
            )}

            {clippedContent && (
              <span
                onClick={() => navigate(`${ARTICLES_LIST_PATH}/${article.id}`)}
                className={styles.link}
              >
                Читать далее...
              </span>
            )}
          </form>
        </div>

        <CardInfo
          author={article.author}
          updated={article.updated}
          created={article.created}
        />

        {!clippedContent && !isEdit && userId === article.author.id && (
          <span onClick={handleChangeEdit} className={styles.link}>
            Редактировать
          </span>
        )}
      </div>
    );
  },
);
