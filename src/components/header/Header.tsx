import React, { FormEvent, ChangeEvent, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import "./Header.css";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchContext = useContext(SearchContext);
  const [keyWord, setKeyWord] = useState(localStorage.getItem("keyWord") || "");
  const [perPage, setPerPage] = useState(searchContext.perPageValue);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setKeyWord((e.target as HTMLInputElement).value);
  };

  const updatePerPageValue = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    localStorage.setItem("perPage", value);
    setPerPage(value);
    searchParams.set("per_page", value);
    searchContext.setPerPageValue(value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const word = keyWord.trim();
    localStorage.setItem("keyWord", word);
    if (!word) {
      setSearchParams({ page: "random", per_page: perPage });
    } else {
      setSearchParams({ search: word, page: "1", per_page: perPage });
    }
    searchParams.set("search", keyWord.trim());
    searchContext.setSearchInputValue(word);
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
