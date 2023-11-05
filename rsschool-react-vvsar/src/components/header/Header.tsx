import React, { FormEvent, useState } from "react";
import "./Header.css";

type HeaderProps = {
  keyWord: string;
  handleSubmit: (value: string) => void;
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

export default function Header({ keyWord, handleSubmit }: HeaderProps) {
  const [searchInputValue, setSearchInputValue] = useState(keyWord);

  const updateKeyWord = (e: FormEvent<HTMLInputElement>) => {
    setSearchInputValue((e.target as HTMLInputElement).value);
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
    </header>
  );
}

// export default Header;
