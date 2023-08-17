import axios from "axios";
import { useState } from "react";

export default function CreateComment({ postId }) {

  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      comment: comment,
    });

    setComment("");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
  
}
