// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Results from "./Results";
// import { mockData, mockPhoto } from "../../mock/mockData";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { mockServer } from "../../mock/mockServer";
// import { useSelector } from "react-redux";

// import { HttpResponse, http } from "msw";
// import { setSearchValue } from "../../redux/features/searchSlice";
// import { photosApi } from "../../redux/services/photosApi";
// import userEvent from "@testing-library/user-event";

describe("Results component", () => {
  // const click = userEvent.setup();
  beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it("Verify that the component renders the specified number of cards", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Results />
        </MemoryRouter>
      </Provider>,
    );

    const cards = await screen.findAllByTestId("card");
    expect(cards).toHaveLength(4);
  });

  it("Validate that clicking on a card opens a detailed card component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Results />
        </MemoryRouter>
      </Provider>,
    );

    const cards = await screen.findAllByTestId("card");
    fireEvent.click(cards[0]);
    const detailsIsOpen = store.getState().detailsData.isOpen;
    expect(detailsIsOpen).toBe(true);
  });
});
