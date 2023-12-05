// import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Results from "../../components/results/Results";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <nav className="nav">
        <button className="button button1" onClick={() => navigate("form1")}>
          FORM 1
        </button>
        <button className="button button2" onClick={() => navigate("form2")}>
          FORM 2
        </button>
      </nav>
      <main className="main">
        <Results />
      </main>
    </>
  );
}
