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
  const [searchInputValue, setSearchInputValue] = useState(initialSearchValue);

  const handleSubmit = (value: string) => {
    localStorage.setItem("keyWord", value);
    setSearchInputValue(value);
  };

  return (
    <>
      <Header keyWord={searchInputValue} handleSubmit={handleSubmit} />
      <Results word={searchInputValue} />
    </>
  );
}

// export default App;
