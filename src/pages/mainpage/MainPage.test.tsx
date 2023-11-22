import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MainPage from "./MainPage";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("Main page", () => {
  test("render Main page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("results")).toBeInTheDocument();
  });
});
