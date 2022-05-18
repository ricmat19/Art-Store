import { render, screen } from "@testing-library/react";
import Products from "./pages/products/[product]";

test("test description", () => {
  render(<Products />);
  const myElement = screen.getByText("Hello World");
  expect(myElement).toBeInTheDocument();
});
