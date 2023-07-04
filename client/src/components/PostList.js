import axios from "axios";
import { useStateContext } from "../context";
import { useEffect } from "react";

export default function PostList() {
  const { state, dispatch } = useStateContext();

  async function fetchPosts() {
    const posts = await axios.get("http://localhost:4000/posts");
    dispatch({
      type: "setPosts",
      payload: posts.data,
    });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(state.listOfPosts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts && renderedPosts}
    </div>
  );
}
