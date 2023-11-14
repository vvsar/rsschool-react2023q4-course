import { render } from "@testing-library/react";
import Card from "./Card";

describe("Header component", () => {
  test("it renders", () => {
    render(<Card url="https://images.unsplash.com/" author="Author" />);
  });
});
