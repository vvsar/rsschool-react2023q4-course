import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  it("Verify that four pagination buttons are rendered", async () => {
    render(
      <Provider store={store}>
        <Pagination
          totalPages={15}
          changeCurrentPage={() => {
            return;
          }}
        />
      </Provider>,
    );

    const buttons = await screen.findAllByRole("button");

    expect(buttons).toHaveLength(4);
  });

  it("Verify that pagination buttons change new currentPage value in local storage", async () => {
    const totalPages = 15;
    // localStorage.setItem("currentPage", "5");
    render(
      <Provider store={store}>
        <Pagination
          totalPages={totalPages}
          changeCurrentPage={() => {
            return;
          }}
        />
      </Provider>,
    );

    const buttons = await screen.findAllByRole("button");
    fireEvent.click(buttons[2]);
    expect(localStorage.getItem("currentPage")).toBe("2");
    fireEvent.click(buttons[3]);
    expect(localStorage.getItem("currentPage")).toBe("15");
    fireEvent.click(buttons[1]);
    expect(localStorage.getItem("currentPage")).toBe("14");
    fireEvent.click(buttons[0]);
    expect(localStorage.getItem("currentPage")).toBe("1");
  });
});
