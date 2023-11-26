import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Header from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test("Header renders", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );
  });

  test("Selecting items per page value saves the new value to the local storage", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );
    const select = screen.getByTestId("select") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "8" } });

    expect(localStorage.getItem("perPage")).toBe("8");
  });

  test("Clicking the Search button saves the entered value to the local storage", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );
    const button = screen.getByRole("button");
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "kitten" } });
    fireEvent.click(button);

    expect(localStorage.getItem("keyWord")).toBe("kitten");
  });
});
