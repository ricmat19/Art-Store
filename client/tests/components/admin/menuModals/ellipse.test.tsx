import { render, screen, waitFor } from "@testing-library/react";
import AdminEllipseMenuModal from "../../../../components/admin/menuModals/ellipseModal";

describe("testing admin ellipse component", () => {
  beforeEach(async () => {<AdminEllipseMenuModal
    ellipseOpen={undefined}
    openEllipse={false}
    handleEllipseClose={undefined}
  />;});
  test("", () => {});
});
