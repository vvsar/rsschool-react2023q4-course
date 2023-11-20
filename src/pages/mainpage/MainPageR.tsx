import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Header from "../../components/header/Header";
import Results from "../../components/results/Results";
import "./MainPage.css";

export default function MainPage() {
  return (
    <Provider store={store}>
      <>
        <p style={{ color: "red" }}>
          <b>Module04 is not finished. Please check later!</b>
        </p>
        <Header />
        <main className="main">
          <Results />
          <Outlet />
        </main>
      </>
    </Provider>
  );
}
