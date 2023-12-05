import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import Form1 from "./pages/form1/Form1";
import Form2 from "./pages/form2/Form2";
import Page404 from "./pages/404/404";
import "./App.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="rsschool-react2023q4-course/" element={<MainPage />} />
        <Route path="rsschool-react2023q4-course/form1" element={<Form1 />} />
        <Route path="rsschool-react2023q4-course/form2" element={<Form2 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
