import { FC, useCallback } from "react";

import { TAuthor } from "../../models/userTypes";

import styles from "./CardInfo.module.scss";

type TArticleCardInfoProps = {
  author: TAuthor;
  updated: string;
  created: string;
};

export const CardInfo: FC<TArticleCardInfoProps> = ({
  author,
  updated,
  created,
}) => {
  const formatDate = useCallback((date: string) => {
    return new Date(date).toLocaleString("ru-RU", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }, []);

  return (
    <div className={styles.article_info}>
      <div className={styles.author_info}>
        <span className={styles.author_info__name}>{author.username}</span>
        <span className={styles.author_info__email}>{author.email}</span>
      </div>

      <div className={styles.article_dates}>
        <span>Обновлено {formatDate(updated)}</span>
        <span>Создано {formatDate(created)}</span>
      </div>
    </div>
  );
};
