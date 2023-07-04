import CreatePost from "./components/CreatePosts";
import PostList from "./components/PostList";

export default function App(){
    return (
        <div className="container">
            <h1>Create Posts</h1>
            <CreatePost/>
            <hr/>
            <h1>
                Posts
            </h1>
            <PostList/>
        </div>
    )
}