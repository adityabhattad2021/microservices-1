import axios from "axios"
import { useStateContext } from "../context";

export default function CreatePost() {
  const { state, dispatch } = useStateContext();

  
  async function handleSubmit(e){
      e.preventDefault();
      console.log(state.title);

      await axios.post("http://posts.com/posts/create",{
        title:state.title
      })

      dispatch({
        type:"setTitle",
        payload:""
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={state.title}
            onChange={(e) =>
              dispatch({ type: "setTitle", payload: e.target.value })
            }
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
