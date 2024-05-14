// searchContext.jsx
import React, { createContext, useState } from "react";

const SearchContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);