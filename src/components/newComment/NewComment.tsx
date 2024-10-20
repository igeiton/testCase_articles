import { FC, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField } from "@mui/material";

import { addComment } from "../../api/comments";

import { store } from "../../store/Store";

import styles from "./NewComment.module.scss";

type TNewCommentProps = {
  content?: string;
  parentId?: number | null;
  onSubmit?: (comment: string) => void;
  onCancel?: () => void;
};

export const NewComment: FC<TNewCommentProps> = observer(
  ({ content = "", parentId = null, onSubmit, onCancel }) => {
    const [text, setText] = useState(content);

    const { article, loadArticle } = store.articlesStore;

    const handleAddComment = useCallback(() => {
      if (onSubmit) {
        return onSubmit(text);
      }
      onCancel?.call(this);

      const newCommentData = {
        content: text,
        parent: parentId,
      };

      if (article?.id)
        addComment(article.id, newCommentData).then(() =>
          loadArticle(article.id, false),
        );
    }, [article?.id, text, parentId, loadArticle, onSubmit, onCancel]);

    return (
      <div className={styles.new_comment}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
        />

        <div className={styles.btns}>
          {parentId && (
            <Button
              variant="outlined"
              onClick={() => onCancel?.call(this)}
              className={styles.button}
            >
              Отменить
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleAddComment}
            className={styles.button}
          >
            {parentId ? "Ответить" : "Отправить"}
          </Button>
        </div>
      </div>
    );
  },
);
