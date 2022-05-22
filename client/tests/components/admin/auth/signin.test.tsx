import { render, screen, waitFor } from "@testing-library/react";
import AdminSignIn from "../../../../components/admin/auth/signin";

describe("testing admin signin component", () => {
  beforeEach(async () => {    await waitFor(() =>
    render(
      <AdminSignIn open={false} handleClose={function (): void {
        throw new Error("Function not implemented.");
      } } email={""} password={""}/>
    )
  );});
  test("", () => {});
});
