import { render, screen, waitFor } from "@testing-library/react";
import AdminDeleteProduct from "../../../../components/admin/products/deleteProductModal";

describe("testing admin delete product component", () => {
  beforeEach(async () => {<AdminDeleteProduct deleteProduct={{
    id: "",
    imageBuffer: undefined,
    title: undefined
  }} handleClose={undefined} open={undefined}/>});
  test("", () => {});
});
