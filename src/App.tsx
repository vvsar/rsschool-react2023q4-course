import { useState } from "react";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./App.css";

// type AppProps = Record<string, never>;

// type AppState = {
//   searchInputValue: string;
// };

// class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     this.state = { searchInputValue: localStorage.getItem("keyWord") || "" };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(value: string) {
//     localStorage.setItem("keyWord", value);
//     this.setState({ searchInputValue: value });
//   }

//   render() {
//     return (
//       <>
//         <Header
//           keyWord={this.state.searchInputValue}
//           handleSubmit={this.handleSubmit}
//         />
//         <Results word={this.state.searchInputValue} />
//       </>
//     );
//   }
// }

export default function App() {
  const initialSearchValue = localStorage.getItem("keyWord") || "";
  const initialPerPageValue = localStorage.getItem("perPage") || "4";
  const initialCurrentPage = localStorage.getItem("currentPage") || "1";
  const [searchInputValue, setSearchInputValue] = useState(initialSearchValue);
  const [perPageValue, setPerPageValue] = useState(initialPerPageValue);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  const handleSubmit = (value: string) => {
    localStorage.setItem("keyWord", value);
    setSearchInputValue(value);
  };

  const handlePerPageChoice = (value: string) => {
    localStorage.setItem("perPage", value);
    setPerPageValue(value);
  };

  const changeCurrentPage = (value: string) => {
    localStorage.setItem("currentPage", value);
    setCurrentPage(value);
  };

  return (
    <>
      <p style={{ color: "red" }}>
        <b>Module02 is not finished. Please check later!</b>
      </p>
      <Header
        keyWord={searchInputValue}
        perPage={perPageValue}
        handleSubmit={handleSubmit}
        handlePerPageChoice={handlePerPageChoice}
      />
      <Results
        word={searchInputValue}
        perPage={perPageValue}
        currentPage={currentPage}
      />
    </>
  );
}

// export default App;
