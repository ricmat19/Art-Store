import { render, screen, waitFor } from "@testing-library/react";
import AdminReset from "../../../../components/admin/auth/resetModal";

describe("testing admin reset component", () => {
  beforeEach(async () => {
    await waitFor(() => render(<AdminReset open={false} handleClose={function (): void {
      throw new Error("Function not implemented.");
    } } email={""} password={""}/>));
  });
  test("", () => {});
});
