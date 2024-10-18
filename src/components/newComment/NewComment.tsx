import { FC, useCallback, useState } from "react";

import { addComment } from "../../api/comments";

import { store } from "../../store/Store";

import styles from "./NewComment.module.scss";
import { observer } from "mobx-react-lite";

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
        <textarea value={text} onChange={(e) => setText(e.target.value)} />

        <div className={styles.btns}>
          {parentId && (
            <button onClick={() => onCancel?.call(this)}>Cancel</button>
          )}

          <button onClick={handleAddComment}>Submit</button>
        </div>
      </div>
    );
  },
);
