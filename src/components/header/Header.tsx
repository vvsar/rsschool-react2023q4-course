import React, { FormEvent, ChangeEvent, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import "./Header.css";

export default function Header() {
  const [searchParams] = useSearchParams();
  const searchContext = useContext(SearchContext);
  const [keyWord, setKeyWord] = useState(searchContext.searchInputValue);
  const [perPage, setPerPage] = useState(searchContext.perPageValue);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setKeyWord((e.target as HTMLInputElement).value);
  };

  const updatePerPageValue = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    localStorage.setItem("perPage", event.target.value);
    setPerPage(event.target.value);
    searchParams.set("per_page", event.target.value);
    searchContext.setPerPageValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("keyWord", keyWord.trim());
    searchParams.set("search", keyWord.trim());
    searchContext.setSearchInputValue(keyWord.trim());
  };

  const placeHolder = "No pagination for random page. Please make a search";

  return (
    <header className="header">
      <div className="page-title">
        <span>FIND IMAGES ON</span>
      </div>
      <div className="search-line">
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="search-input"
            type="search"
            placeholder={placeHolder}
            value={keyWord}
            onChange={updateKeyWord}
          ></input>
          <button className="search-button" type="submit"></button>
        </form>
      </div>
      <div className="number-select-form">
        <label className="select-label" htmlFor="number-select">
          PER PAGE:
        </label>
        <select
          id="number-select"
          value={perPage}
          onChange={updatePerPageValue}
        >
          <option value={"4"} key={4}>
            4
          </option>
          <option value={"8"} key={8}>
            8
          </option>
          <option value={"12"} key={12}>
            12
          </option>
        </select>
      </div>
    </header>
  );
}
