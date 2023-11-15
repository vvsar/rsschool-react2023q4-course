import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Page404 from "./404";

describe("404 page", () => {
  test("404 page appears when following an incorrect route", () => {
    render(
      <MemoryRouter initialEntries={["/wrong_address"]}>
        <Routes>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>,
    );
    const pageNotFoundText = screen.getByText("PAGE NOT FOUND!");
    expect(pageNotFoundText).toBeTruthy();
  });
});
