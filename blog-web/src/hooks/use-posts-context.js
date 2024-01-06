import { useContext } from "react";
import PostsContext from "../context/posts";

function usePostsContext() {
  return useContext(PostsContext);
}

export default usePostsContext;