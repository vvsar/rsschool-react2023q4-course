import React from "react";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./App.css";

let keyWord = "";
if (typeof window !== "undefined") {
  const data = localStorage.getItem("keyWord");
  if (data !== null) {
    keyWord = data;
  }
}

class App extends React.Component {
  state = { searchInputValue: keyWord };
  render() {
    return (
      <>
        <Header />
        <Results query={keyWord} />
      </>
    );
  }
}

export default App;
