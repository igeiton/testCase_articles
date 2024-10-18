import { FC } from "react";

import styles from "./ArticleTitle.module.scss";

type TArticleTitleProps = {
  title: string;
  setTitle: (newTitle: string) => void;
  isEdit?: boolean;
};

export const ArticleTitle: FC<TArticleTitleProps> = ({
  title,
  isEdit,
  setTitle,
  ...props
}) => {
  return isEdit ? (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      {...props}
    />
  ) : (
    <span className={styles.title} {...props}>
      {title}
    </span>
  );
};
