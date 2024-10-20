import { FC, useCallback, useState } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

import { CardInfo } from "../cardInfo/CardInfo";
import { NewComment } from "../newComment/NewComment";

import { TComment } from "../../models/commentsTypes";

import { deleteComment, updateComment } from "../../api/comments";
import { store } from "../../store/Store";

import styles from "./Comment.module.scss";

type TCommentProps = {
  indent: number;
  comment: TComment;
  children: React.ReactNode;
};

export const Comment: FC<TCommentProps> = observer(
  ({ indent, comment, children }) => {
    const [openComment, setOpenComment] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const { article, loadArticle } = store.articlesStore;

    const { userId } = store.authStore;

    const { id, content, parent, author, updated, created } = comment;

    const hasAccessToEditComment = userId === comment.author.id;

    const handleUpdateComment = useCallback(
      async (content: string) => {
        try {
          const newCommentData = {
            content,
            parent,
          };

          if (article?.id) {
            await updateComment(article.id, comment.id, newCommentData);
            await loadArticle(article.id, false);
            setEdit(false);
          }
        } catch (error) {
          console.error("Error updating comment:", error);
        }
      },
      [parent, article?.id, comment.id, loadArticle],
    );

    const handleDeleteComment = useCallback(() => {
      if (article?.id) deleteComment(article.id, comment.id);
    }, [comment.id, article?.id]);

    return (
      <div
        className={classNames(styles.comment_wrapper, {
          [styles.indent]: !!indent,
        })}
      >
        <div className={styles.comment}>
          {isEdit ? (
            <NewComment
              onSubmit={handleUpdateComment}
              content={content}
              parentId={id}
              onCancel={() => setEdit(false)}
            />
          ) : (
            <div>{comment.content}</div>
          )}

          {hasAccessToEditComment && (
            <div className={styles.btns}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleDeleteComment}
                className={styles.button}
              >
                Удалить комментарий
              </Button>

              {!isEdit && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEdit(true)}
                  className={styles.button}
                >
                  Редактировать
                </Button>
              )}
            </div>
          )}

          <CardInfo author={author} updated={updated} created={created} />

          {openComment ? (
            <NewComment parentId={id} onCancel={() => setOpenComment(false)} />
          ) : (
            <Button size="small" onClick={() => setOpenComment(true)}>
              <ReplyIcon />
            </Button>
          )}
        </div>

        {children}
      </div>
    );
  },
);
