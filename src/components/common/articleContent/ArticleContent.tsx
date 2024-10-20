import { FC } from "react";
import classNames from "classnames";
import { TextField } from "@mui/material";

import styles from "./ArticleContent.module.scss";

type TArticleContentProps = {
  content: string;
  isEdit?: boolean;
  clippedContent?: boolean;
  setContent: (newContent: string) => void;
};

export const ArticleContent: FC<TArticleContentProps> = ({
  content,
  isEdit,
  setContent,
  clippedContent,
  ...props
}) =>
  isEdit ? (
    <TextField
      type="text"
      multiline
      value={content}
      onChange={(e) => setContent(e.target.value)}
      {...props}
    />
  ) : (
    <span
      className={classNames(styles.content, {
        [styles.clipped_content]: clippedContent,
      })}
      {...props}
    >
      {content}
    </span>
  );
