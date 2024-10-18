import { FC, useCallback, useState } from "react";
import classNames from "classnames";

import { CardInfo } from "../cardInfo/CardInfo";
import { NewComment } from "../newComment/NewComment";

import { TComment } from "../../models/commentsTypes";

import { updateComment } from "../../api/comments";
import { store } from "../../store/Store";

import styles from "./Comment.module.scss";
import { observer } from "mobx-react-lite";

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

          <CardInfo author={author} updated={updated} created={created} />

          {hasAccessToEditComment && (
            <div onClick={() => setEdit(true)}>Edit comment</div>
          )}

          {openComment ? (
            <NewComment parentId={id} onCancel={() => setOpenComment(false)} />
          ) : (
            <span onClick={() => setOpenComment(true)}>Reply</span>
          )}
        </div>

        {children}
      </div>
    );
  },
);
