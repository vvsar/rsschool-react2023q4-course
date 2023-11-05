import React from "react";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./App.css";

// let keyWord = "";
// if (typeof window !== "undefined") {
//   const data = localStorage.getItem("keyWord");
//   if (data !== null) {
//     keyWord = data;
//   }
// }

type AppProps = Record<string, never>;

type AppState = {
  searchInputValue: string;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { searchInputValue: localStorage.getItem("keyWord") || "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value: string) {
    localStorage.setItem("keyWord", value);
    this.setState({ searchInputValue: value });
  }

  render() {
    return (
      <>
        <Header
          keyWord={this.state.searchInputValue}
          handleSubmit={this.handleSubmit}
        />
        <Results word={this.state.searchInputValue} />
      </>
    );
  }
}

export default App;
