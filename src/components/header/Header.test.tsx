import { render, screen } from "@testing-library/react";
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
});
