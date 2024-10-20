import { FC } from "react";
import { TextField } from "@mui/material";

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
}) =>
  isEdit ? (
    <TextField
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
