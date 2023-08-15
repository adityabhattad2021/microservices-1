

export default function CommentList({ comments }) {

  const renderedComments = comments.map(
    (comment) => {
        console.log(comment);
      return (
        <li
            key={comment.commentId}
        >
            {comment.status==='approved' ? comment.comment : comment.status==='pending'?'This comment is being reviewed by our moderation team' : 'Comment was blocked by our modertion service'}
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
