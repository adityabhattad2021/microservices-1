import axios from "axios";
import { useEffect,useState } from "react";

export default function CommentList({ postId }) {

    const [listOfComments,setListOfComments]=useState([]);

  async function fetchCommentsForPostId() {
    const comments = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setListOfComments(comments.data)
  }

  useEffect(() => {
    fetchCommentsForPostId();
  },[]);

  const renderedComments = listOfComments.map(
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
