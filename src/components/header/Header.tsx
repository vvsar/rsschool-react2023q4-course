import React, { FormEvent, ChangeEvent, useState } from "react";
import styles from "./Header.module.css";
import { HeaderProps } from "@/types/types";

export default function Header(props: HeaderProps) {
  const [keyWord, setKeyWord] = useState(props.keyWord);
  const [perPage, setPerPage] = useState(props.perPage);
  const placeHolder = "No pagination for random page. Please make a search";

  // useEffect(() => {
  //   setKeyWord(localStorage.getItem('keyWord') || '');
  //   setPerPage(localStorage.getItem('perPage') || '4');
  // }, []);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setKeyWord((e.target as HTMLInputElement).value);
  };

  const updatePerPageValue = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    props.onPerPageChange(value);
    setPerPage(value);
    localStorage.setItem("currentPage", "1");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const word = keyWord.trim();
    props.onSubmit(word);
    localStorage.setItem("currentPage", "1");
  };

  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.page_title}>
        <span>FIND IMAGES ON</span>
      </div>
      <div className={styles.search_line}>
        <form className={styles.search_form} onSubmit={onSubmit}>
          <input
            className={styles.search_input}
            type="search"
            placeholder={placeHolder}
            value={keyWord}
            onChange={updateKeyWord}
          ></input>
          <button className={styles.search_button} type="submit"></button>
        </form>
      </div>
      <div className={styles.number_select_form}>
        <label className={styles.select_label} htmlFor="number-select">
          PER PAGE:
        </label>
        <select
          id="number-select"
          className={styles.number_select}
          data-testid="select"
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
