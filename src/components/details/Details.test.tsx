import { render, screen, act } from "@testing-library/react";
import Details from "./Details";
import "@testing-library/jest-dom";
import { mockServer } from "../../mock/mockServer";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("Details component", () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());
  // test("Details component renders", async () => {
  //   await act(async () => {
  //     render(
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <Routes>
  //             <Route path="details/:id" element={<Details />} />
  //           </Routes>
  //         </BrowserRouter>
  //       </Provider>
  //     );
  //   });
  // });

  test("Check that a loading indicator is displayed while fetching data", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Details />
        </Provider>,
      );
    });
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent("Loading...");
  });

  // test("temporary test", async () => {
  //   await act(async () => {
  //     render(
  //       <Provider store={store}>
  //         <Details />
  //       </Provider>
  //     );
  //   });
  //   const author = screen.getByTestId("author");
  //   expect(author).toMatch("Author: Peter Jones");
  // });

  //   test("Ensure that the card component renders the relevant card data", async () => {
  //     await act(async () => {
  //       saveOpenStatus(true);
  //       saveId("abc");
  //       render(
  //         <Provider store={store}>
  //           <Details />
  //         </Provider>
  //       );
  //     });
  //     await waitFor(() => {
  //       const details = screen.findByTestId("details");
  //       expect(details).toBeInTheDocument();
  //       const img = screen.getByTestId("img") as HTMLImageElement;
  //       expect(img.src).toMatch(mockPhoto.urls.regular);
  //       expect(img.alt).toMatch(mockPhoto.alt_description);
  //       const author = screen.getByTestId("author");
  //       expect(author).toMatch(`Author: ${mockPhoto.user.name}`);
  //       const description = screen.getByTestId("description");
  //       expect(description).toMatch(mockPhoto.description);
  //       const camera = screen.getByTestId("camera");
  //       expect(camera).toMatch(`Camera: ${mockPhoto.exif.name}`);
  //     });
  //   });
});
