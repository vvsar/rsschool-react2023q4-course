import React, { FormEvent, ChangeEvent, useState } from "react";
import "./Header.css";

type HeaderProps = {
  keyWord: string;
  perPage: string;
  handleSubmit: (value: string) => void;
  handlePerPageChoice: (value: string) => void;
};

export default function Header({
  keyWord,
  perPage,
  handleSubmit,
  handlePerPageChoice,
}: HeaderProps) {
  const [searchInputValue, setSearchInputValue] = useState(keyWord);
  const [perPageValue, setPerPageValue] = useState(perPage);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setSearchInputValue((e.target as HTMLInputElement).value);
  };

  const updatePerPageValue = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPerPageValue(event.target.value);
    handlePerPageChoice(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(searchInputValue.trim());
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
            value={searchInputValue}
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
          value={perPageValue}
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
