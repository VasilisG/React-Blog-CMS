import { useContext } from "react";
import SearchContext from "../context/search";

const useSearchContext = () => {
  return useContext(SearchContext);
}

export default useSearchContext;