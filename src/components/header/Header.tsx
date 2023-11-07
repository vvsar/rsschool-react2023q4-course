import React, { FormEvent, ChangeEvent, useState } from "react";
import "./Header.css";

type HeaderProps = {
  keyWord: string;
  perPage: string;
  handleSubmit: (value: string) => void;
  handlePerPageChoice: (value: string) => void;
};

// type SearchBarState = {
//   keyWord: string;
// };

// type State = Readonly<SearchBarState>;

// class Header extends React.Component<HeaderProps, SearchBarState> {
//   constructor(props: HeaderProps) {
//     super(props);
//     this.state = { keyWord: this.props.keyWord };
//     this.updateKeyWord = this.updateKeyWord.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   updateKeyWord(e: FormEvent<HTMLInputElement>) {
//     this.setState({ keyWord: (e.target as HTMLInputElement).value });
//   }

//   onSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     this.props.handleSubmit(this.state.keyWord.trim());
//   };

//   render() {
//     return (
//       <header className="header">
//         <div className="search-line">
//           <form className="search-form" onSubmit={this.onSubmit}>
//             <input
//               className="search-input"
//               type="search"
//               value={this.state.keyWord}
//               onChange={this.updateKeyWord}
//             ></input>
//             <button className="search-button" type="submit"></button>
//           </form>
//         </div>
//       </header>
//     );
//   }
// }

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

  return (
    <header className="header">
      <div className="search-line">
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="search-input"
            type="search"
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
          <option value={"8"} key={9}>
            9
          </option>
          <option value={"12"} key={12}>
            12
          </option>
        </select>
      </div>
    </header>
  );
}

// export default Header;
