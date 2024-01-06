import { useContext } from "react";
import SearchContext from "../context/search";

function useSearchContext() {
  return useContext(SearchContext);
}

export default useSearchContext;