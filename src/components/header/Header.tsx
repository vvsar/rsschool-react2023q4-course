import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  saveSearchValue,
  savePerPageValue,
  saveCurrentPageValue,
} from "../../redux/searchDataSlice";
import "./Header.css";

export default function Header() {
  const searchData = useSelector((state: AppState) => state.searchData);
  const [keyWord, setKeyWord] = useState(searchData.keyWord);
  const [perPage, setPerPage] = useState(searchData.perPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeHolder = "No pagination for random page. Please make a search";

  useEffect(() => {
    let urlAddition: string;
    if (keyWord) {
      setSearchParams({
        search: searchData.keyWord,
        page: searchData.currentPage,
        per_page: searchData.perPage,
      });
      urlAddition = `?search=${searchData.keyWord}&page=${searchData.currentPage}&per_page=${searchData.perPage}`;
    } else {
      setSearchParams({ page: "random", per_page: searchData.perPage });
      urlAddition = `?page=random&per_page=${searchData.perPage}`;
    }
    navigate(`/rsschool-react2023q4-course/${urlAddition}`);
  }, []);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setKeyWord((e.target as HTMLInputElement).value);
  };

  const updatePerPageValue = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    searchParams.set("per_page", value);
    if (keyWord) searchParams.set("page", "1");
    localStorage.setItem("perPage", value);
    setPerPage(value);
    dispatch(savePerPageValue(value));
    localStorage.setItem("currentPage", "1");
    dispatch(saveCurrentPageValue("1"));
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
    localStorage.setItem("currentPage", "1");
    dispatch(saveSearchValue(word));
    dispatch(saveCurrentPageValue("1"));
  };

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
          data-testid="select"
          value={searchData.perPage}
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
