import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Details from "./components/details/Details";
import Page404 from "./pages/404/404";
import "./App.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="rsschool-react2023q4-course/" element={<MainPage />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
