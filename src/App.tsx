import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import "./App.css";

export default function App() {
  const initialSearchValue = localStorage.getItem("keyWord") || "";
  const initialPerPageValue = localStorage.getItem("perPage") || "4";
  const [searchInputValue, setSearchInputValue] = useState(initialSearchValue);
  const [perPageValue, setPerPageValue] = useState(initialPerPageValue);

  const handleSubmit = (value: string) => {
    localStorage.setItem("keyWord", value);
    setSearchInputValue(value);
  };

  const handlePerPageChoice = (value: string) => {
    localStorage.setItem("perPage", value);
    setPerPageValue(value);
  };

  return (
    <>
      <Routes>
        <Route
          path="rsschool-react2023q4-course/"
          element={
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
              <Results word={searchInputValue} perPage={perPageValue} />
            </>
          }
        />
      </Routes>
    </>
  );
}

// return (
//   <>
//     <Routes>
//       <Route
//         path="rsschool-react2023q4-course"
//         element={<Results word={searchInputValue} perPage={perPageValue} />}
//       />
//     </Routes>
//   </>
// );
