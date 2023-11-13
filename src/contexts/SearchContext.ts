import { createContext } from "react";

type SearchContextType = {
  searchInputValue: string;
  perPageValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  setPerPageValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType>({
  searchInputValue: "",
  perPageValue: "",
  setSearchInputValue: () => {},
  setPerPageValue: () => {},
});

export default SearchContext;
