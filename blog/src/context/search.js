import { createContext, useState } from 'react';

const SearchContext = createContext();

const Provider = ({children}) => {
  const [tabsVisible, setTabsVisible] = useState(false);

  const values = {
    tabsVisible,
    setTabsVisible
  };

  return (
    <SearchContext.Provider value={values}>
      {children}
    </SearchContext.Provider>
  );
}

export { Provider };

export default SearchContext;