import { render, screen, waitFor } from "@testing-library/react";
import Products from "../../../pages/products/[product]";
import user from "@testing-library/user-event";
import IndexAPI from "../../../apis/indexAPI";

describe("Admin products tests", () => {
  beforeEach(async () => {
    await waitFor(() => render(<Products />));
  });
  test("Check for text 'Stuck Crowd'", () => {
    expect(screen.findByText("Stuck Crowd")).toBeInTheDocument();
  });

  test("Check for text 'Delete'", () => {
    expect(screen.findByText("Delete")).toBeInTheDocument();
  });

  test("Check for text 'Update'", () => {
    expect(screen.findByText("Update")).toBeInTheDocument();
  });

  test("", () => {
    user.click(screen.getByRole("button", { name: "delete" }));
  });

  test("", () => {
    user.click(screen.getByRole("button", { name: "update" }));
  });
});
