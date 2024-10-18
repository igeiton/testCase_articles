import { FC, useCallback } from "react";

import { Comment } from "../comment/Comment";

import { TComment } from "../../models/commentsTypes";
import { NewComment } from "../newComment/NewComment";

import styles from "./Comments.module.scss";

type TCommentsProps = {
  comments: TComment[];
};

export const Comments: FC<TCommentsProps> = ({ comments }) => {
  const getComments = useCallback(
    (comment: TComment, indent: number = 0): React.ReactNode => (
      <Comment key={comment.id} indent={indent} comment={comment}>
        {comment.children.map((commentChildren) =>
          getComments(commentChildren, comment.children ? indent + 1 : 0),
        )}
      </Comment>
    ),
    [],
  );

  return (
    <>
      <div className={styles.comments}>
        {comments.map((comment) => getComments(comment))}
      </div>

      <NewComment />
    </>
  );
};
