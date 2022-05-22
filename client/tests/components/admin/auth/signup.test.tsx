import { render, screen, waitFor } from "@testing-library/react";
import AdminSignUp from "../../../../components/admin/auth/signup";

describe("testing admin signup component", () => {
  beforeEach(async () => {<AdminSignUp open={false} handleClose={function (): void {
    throw new Error("Function not implemented.");
  } }/>});
  test("", () => {});
});
