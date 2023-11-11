import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./MainPage.css";

export default function MainPage() {
  const initialSearchValue = localStorage.getItem("keyWord") || "";
  const initialPerPageValue = localStorage.getItem("perPage") || "4";
  const [searchInputValue, setSearchInputValue] = useState(initialSearchValue);
  const [perPageValue, setPerPageValue] = useState(initialPerPageValue);

  const handleSubmit = (value: string) => {
    localStorage.setItem("keyWord", value);
    setSearchInputValue(value);
  };

  const handlePerPageChoice = (value: string) => {
    localStorage.setItem("perPage", value);
    setPerPageValue(value);
  };

  return (
    <>
      <p style={{ color: "red" }}>
        <b>Module03 is not finished. Please check later!</b>
      </p>
      <Header
        keyWord={searchInputValue}
        perPage={perPageValue}
        handleSubmit={handleSubmit}
        handlePerPageChoice={handlePerPageChoice}
      />
      <main className="main">
        <Results word={searchInputValue} perPage={perPageValue} />
        <Outlet />
      </main>
    </>
  );
}
