import { useContext } from "react";
import CommentsContext from "../context/comments";

function useCommentsContext() {
  return useContext(CommentsContext);
}

export default useCommentsContext;