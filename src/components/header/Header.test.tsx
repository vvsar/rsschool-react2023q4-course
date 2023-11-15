import { render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  test("Header renders", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });

  test("Search line retrieves the value from the local storage upon mounting", () => {
    localStorage.setItem("keyWord", "kitten");
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    expect(input.value).toBe("kitten");
  });

  test("Clicking the Search button saves the entered value to the local storage", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const button = screen.getByRole("button");
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    input.value = "kitten";
    act(() => {
      button.click();
    });

    expect(localStorage.getItem("keyWord")).toBe("kitten");
  });
});
