

export default function CommentList({ comments }) {

  const renderedComments = comments.map(
    (comment) => {
        console.log(comment);
      return (
        <li
            key={comment.commentId}
        >
            {comment.comment}
        </li>
      );
    }
  );

  return (
    <ul>
      {renderedComments && renderedComments}
    </ul>
  );
}
