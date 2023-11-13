import { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import SearchContext from "./contexts/SearchContext";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./MainPage.css";

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const initialSearchValue =
    searchParams.get("search") || localStorage.getItem("keyWord") || "";
  const initialPerPageValue =
    searchParams.get("perPage") || localStorage.getItem("perPage") || "4";
  const [searchInputValue, setSearchInputValue] = useState(initialSearchValue);
  const [perPageValue, setPerPageValue] = useState(initialPerPageValue);

  return (
    <SearchContext.Provider
      value={{
        searchInputValue,
        perPageValue,
        setSearchInputValue,
        setPerPageValue,
      }}
    >
      <>
        <p style={{ color: "red" }}>
          <b>Module03 is not finished. Please check later!</b>
        </p>
        <Header />
        <main className="main">
          <Results word={searchInputValue} perPage={perPageValue} />
          <Outlet />
        </main>
      </>
    </SearchContext.Provider>
  );
}
